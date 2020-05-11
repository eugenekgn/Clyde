//TODO: add babel
import Router from 'koa-router';
const router = new Router();
import model from './models/rhinoceros.model';
import util from 'util'
import { validateRhino } from './validators'

// 4. Add a route that returns Endangered Rhinos
router.get('/rhinoceros/endangered', (ctx, next) => {

  const rhinoceroses = model.getAllEndanged();
  ctx.response.body = { rhinoceroses };
});

// 1. Add a new route to the API
router.get('/rhinoceros/:id', (ctx, next) => {
  const id = ctx.params.id
  const rhinoceroses = model.getById(id);
  ctx.response.body = { rhinoceroses };
});

//2. Add validation to the Create Rhino route
router.post('/rhinoceros', async (ctx, next) => {

  const rhino = ctx.request.body;

  const errors = validateRhino(rhino)

  if (errors) {
    ctx.body = `There have been validation errors: ${util.inspect(errors)}`;
    ctx.status = 400;
  } else {
    ctx.response.body = model.newRhinoceros(ctx.request.body);
  }

});

// 3. Add filters to the Get All Rhinos route
router.get('/rhinoceros', (ctx, next) => {

  const filters = { name: ctx.query.name, species: ctx.query.species }
  const rhinoceroses = model.getAll(filters);
  ctx.response.body = { rhinoceroses };
});



module.exports = router;
