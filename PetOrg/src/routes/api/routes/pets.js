const KoaRouter = require('koa-router');

const router = new KoaRouter();

const PERMITTED_PARAMETERS = ['name', 'age', 'sex', 'size', 'description'];
const USER_PERMITTED_PARAMETERS = ['email', 'name', 'adress', 'is_volunteer', 'money'];
const ANIMAL_PERMITTED_PARAMETERS = ['animal'];

router.get('/', async (ctx) => {
  const pets = await ctx.orm.pet.findAll({include: 
    [{model: ctx.orm.user, attributes: USER_PERMITTED_PARAMETERS},
    {model: ctx.orm.animal, attributes: ANIMAL_PERMITTED_PARAMETERS}],
    attributes: PERMITTED_PARAMETERS});
  ctx.body = pets.map((pet) => ({
    ...pet.toJSON()
  }));
  return ctx.body
});

module.exports = router;
