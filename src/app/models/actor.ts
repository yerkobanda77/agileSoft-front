export class Actor {
    public adult: boolean;
    public gender: number;
    public id: number;
    public known_for_department: string;
    public name: string;
    public original_name: string;
    public popularity: number;
    public profile_path: string;
    public cast_id: number;
    public character: string;
    public credit_id: string;
    public order: number;

    constructor() {
        this.adult = false;
        this.gender = 0;
        this.id = 0;
        this.known_for_department = "";
        this.name = "";
        this.original_name = "";
        this.popularity = 0;
        this.profile_path = "";
        this.cast_id = 0;
        this.character = "";
        this.credit_id = "";
        this.order = 0;
    }
}
