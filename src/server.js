import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import router from './controllers/rhinoceros.controller.js';

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.proxy = true;

app.use(bodyParser());
app.use(async (ctx, next) => {
  console.log('request received', { method: ctx.method, path: ctx.path });
  await next();
});

app.use(router.routes());

console.log(`Server listening on port: ${PORT}`);
const server = app.listen(PORT);
