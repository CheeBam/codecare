import BaseProxy from './BaseProxy';

class Auth extends BaseProxy {
    constructor(parameters = {}) {
        super('/api/v1/auth', parameters);
    }

    async login(params = {}) {
        return this.submit('post', '/login', params);
    }

    async register(params = {}) {
        return this.submit('post', '/register', params);
    }

    async getCurrent() {
        return this.submit('get', '/current');
    }
}

export default Auth;
