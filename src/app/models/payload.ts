export class Payload {
    public refresh_token: string;
    public token: string;
    public type: string;

    constructor() {
        this.refresh_token = '';
        this.token = '';
        this.type = '';
    }
}
