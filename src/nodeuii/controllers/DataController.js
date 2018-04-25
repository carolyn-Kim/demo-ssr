import { route, GET } from 'awilix-koa';

@route('/data')
class DataController {
    constructor({ indexService }) {
        this.indexService = indexService;
    }

    @route('/getinfos')
    @GET()
    async getData(ctx, next) {
        console.log(123);
        const res = await this.indexService.getData();
        ctx.body = res;
    }
}
export default DataController;
