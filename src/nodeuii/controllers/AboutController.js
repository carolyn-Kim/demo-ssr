import { route, GET } from 'awilix-koa';

@route('/getabout')
class DataController {
    constructor({ aboutService }) {
        this.aboutService = aboutService;
    }

    @GET()
    async getData(ctx, next) {
        const res = await this.aboutService.getData();
        ctx.body = res;
    }
}
export default DataController;
