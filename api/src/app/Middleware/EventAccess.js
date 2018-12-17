'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event');

class EventAccess {
  /**
   * @param {object} ctx
   * @param {Function} next
   */
  async handle ({ auth, request, params, response }, next) {

    const event = await Event
      .query()
      .where('deleted_at', null)
      .where('user_id', auth.user.id)
      .where('id', params.id)
      .first();

    if (event) {
      await next();
    } else {
      return response.status(403).json({
        errors: 'No permission',
      });
    }

    await next();
  }
}

module.exports = EventAccess;
