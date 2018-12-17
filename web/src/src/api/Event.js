import BaseProxy from './BaseProxy';

class Event extends BaseProxy {
    constructor(parameters = {}) {
        super('/api/v1/events', parameters);
    }

    async index(params = {}) {
        return this.submit('get', '/', params);
    }

    async show(id) {
        return this.submit('get', `/${id}`);
    }

    async store(params) {
        return this.submit('post', `/`, params);
    }

    async destroy(id) {
        return this.submit('delete', `/${id}`);
    }

    async downloadJson(params) {
        return this.submit('post', '/download', params);
    }
}

export default Event;
