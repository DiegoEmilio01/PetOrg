const KoaRouter = require('koa-router');
const { guardCoord } = require('./guards.js');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'animal',
];

router.param('id', async (id, ctx, next) => {
  const animal = await ctx.orm.animal.findByPk(id);
  if (!animal) ctx.throw(404);
  ctx.state.animal = animal;
  return next();
});

router.get('animalsJson', '/animalsJson', async (ctx) =>{
  const animals = await ctx.orm.animal.findAll();
  switch (ctx.accepts(['json'])) {
    case 'json':
      ctx.body = animals.map(({animal}) => (animal));
      break;
    default:
      break;
  }
})

router.get('animals', '/', guardCoord, async (ctx) => {
  const animals = await ctx.orm.animal.findAll();
  await ctx.render('animals/index', {
    animals,
    editAnimalPath: (id) => ctx.router.url('animals-edit', id),
    deleteAnimalPath: (id) => ctx.router.url('animal-delete', id),
    newAnimalPath: ctx.router.url('animals-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('animals-new', '/new', guardCoord, async (ctx) => {
  const animal = ctx.orm.animal.build();
  return ctx.render('animals/new', {
    animal,
    createAnimalPath: ctx.router.url('animals-create'),
  });
});

router.post('animals-create', '/', guardCoord, async (ctx) => {
  const animal = ctx.orm.animal.build(ctx.request.body);
  try {
    await animal.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('animals'));
  } catch (error) {
    await ctx.render('animals/new', {
      errors: error.errors,
      animal,
      createAnimalPath: ctx.router.url('animals-create'),
    });
  }
});

router.get('animals-edit', '/edit/:id', guardCoord, async (ctx) => {
  const { animal } = ctx.state;
  return ctx.render('animals/edit', {
    animal,
    updateAnimalPath: ctx.router.url('animals-update', animal.id),
  });
});

router.post('animals-update', '/:id', guardCoord, async (ctx) => {
  const { animal } = ctx.state;
  try {
    await animal.update(ctx.request.body);
    ctx.redirect(ctx.router.url('animals'));
  } catch (error) {
    await ctx.render('animals/edit', {
      errors: error.errors,
      animal,
      updateAnimalPath: ctx.router.url('animals-update', animal.id),
    });
  }
});


router.get('animal-delete', '/delete/:id', guardCoord, async (ctx) => {
  const { animal } = ctx.state;
  await animal.destroy();
  ctx.redirect(ctx.router.url('animals'));
});

module.exports = router;
