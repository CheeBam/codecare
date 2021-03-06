'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return {greeting: 'Hello world in JSON !'}
});

Route.group(() => {
  Route.post('auth/register', 'AuthController.register');
  Route.post('auth/login', 'AuthController.login');
}).prefix('api/v1');


Route.group(() => {
  Route.get('auth/current', 'AuthController.index');

  Route.resource('events', 'EventController').middleware(new Map([
    [['events.show', 'events.destroy'], ['event.access']]
  ])).apiOnly();

  Route.post('events/download', 'EventController.downloadJson')

}).prefix('api/v1').middleware('auth');
