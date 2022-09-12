export class RequestError {
    success = false;
    code: number;
    message: string;
    constructor(code: number, message: string) {
        this.message = message;
        this.code = code;
    }
}

export class SuccessfulRequest {
    success = true;
    data: any;
    constructor(data: any) {
        this.data = data;
    }
}