export default class HttpAdapter {
    url: string;
    method: string;

    constructor(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') {
        this.url = url;
        this.method = method;
    }

    parseUrlWith(params: any) {
        // dont parase if no params were present in the uri
        if (this.url.includes('/:') === false) return;

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                this.url = this.url.replace(`:${key}`, params[key].toString());
            }
        }
    }
}