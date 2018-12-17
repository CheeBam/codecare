'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users');
      table.string('title').notNullable();
      table.integer('start').notNullable();
      table.integer('duration').notNullable();
      table.timestamps();
      table.timestamp('deleted_at').nullable().defaultTo(null).index();
    })
  }

  down () {
    this.drop('events');
  }
}

module.exports = EventSchema;
