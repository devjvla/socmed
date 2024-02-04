class UsersController {
    #req;
    #res;

    constructor() {
        this.#req = req;
        this.#res = res;
    }
}

modules.export = UsersController;