'use strict';

const errorHandler = {
    error(app, logger) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                logger.error(error);
                ctx.status = error.status || 500;
                ctx.body = await ctx.render('500', { error: error.stack });
            }
        });
        app.use(async (ctx, next) => {
            await next();
            if (ctx.status !== 404) return;
            ctx.status = 404;
            ctx.body = await ctx.render('404');
        });
    }
};
export default errorHandler;
