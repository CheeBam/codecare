'use strict';

const Event = use('App/Models/Event');
const Database = use('Database');
const { DateTime } = require('luxon');
const {validate} = use('Validator');
const Constants = use('App/Helpers/Constants');

class EventController {

  /**
   * Create/save a new event.
   * GET events
   */
  async index({auth}) {

    const events = await Event
      .query()
      .where('user_id', auth.user.id)
      .whereNull('deleted_at')
      .with('user')
      .orderBy('start')
      .fetch();

    return events;
  }

  /**
   * Create/save a new event.
   * POST events
   */
  async store({auth, request, response}) {

    const validation = await validate(request.all(), {
      title: 'required',
      start: 'required',
      duration: 'required',
    });

    if (validation.fails()) {
      return response.status(422).json({
        errors: validation.messages(),
      });
    }


    let startError = true;
    let diff= 0;
    const pattern = new RegExp("^([0-1]\\d)(:[0-5]\\d)$");
    if (pattern.test(request.input('start'))) {
        const eventBegin = DateTime.fromFormat(request.input('start'), 'HH:mm');
        const startTime = DateTime.fromFormat(Constants.TIMES_START_TIME, 'HH:mm');
        diff = eventBegin.diff(startTime, 'minutes');
        if (diff.minutes > 0 && diff.minutes <= Constants.TIMES_MAX_MINUTES) {
            startError = false;
        }
    }

    if (startError) {
      return response.status(422).json({
        errors: 'Start value is incorrect',
      });
    }

    await Event.create({
      title: request.input('title'),
      user_id: auth.user.id,
      start: diff.minutes,
      duration: request.input('duration'),
    });

    return {};
  }

  /**
   * Display a single event.
   * GET events/:id
   */
  async show({params}) {

    const event = await Event
      .query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .with('user')
      .first();

    return event;
  }

  /**
   * Delete a single event.
   * DELETE events/:id
   */
  async destroy({params, request, response}) {

    try {
      const event = await Event
        .query()
        .where('id', params.id)
        .whereNull('deleted_at')
        .first();

        event.deleted_at = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
        event.save();
    } catch (e) {
      return response.status(404).json({
        errors: e.message,
      });
    }

    return {};
  }
  /**
   * Download events json.
   * POST events/download
   */
  async downloadJson({auth, request, response}) {

      const validation = await validate(request.all(), {
        file: 'required',
      });

      if (validation.fails()) {
        return response.status(422).json({
          errors: validation.messages(),
        });
      }

      try {
        const json = JSON.parse(JSON.stringify(eval(`(${request.input('file')})`)));
        json.forEach((item) => { item.user_id = auth.user.id });

        await Database
          .from('events')
          .insert(json);
      } catch (e) {
        return response.status(500).json({
          errors: 'Error on download file',
        });
      }

    return {};
  }


}

module.exports = EventController;
