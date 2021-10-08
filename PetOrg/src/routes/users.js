const KoaRouter = require('koa-router');
const bcrypt = require('bcrypt');
const { guardCoord, guardNegative, guardPositive } = require('./guards.js');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'email',
  'password',
  'adress',
  'is_volunteer',
  'money',
];


router.param('id', async (id, ctx, next) =>{
  const user = await ctx.orm.user.findByPk(id.toString());
  if (!user) ctx.throw(404);
  ctx.state.user = user;
  return next();
});

router.get('users', '/', guardCoord, async (ctx) => {
  const users = await ctx.orm.user.findAll();
  await ctx.render('users/index', {
    users,
    userPath: (id) => ctx.router.url('user', id),
    newUserPath: ctx.router.url('users-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('users-new', '/new', guardNegative, (ctx) => {
  const user = ctx.orm.user.build();
  return ctx.render('users/new', {
    user,
    actionPath: ctx.router.url('users-create'),
    submit_text: "Crear",
  });
});

router.post('users-create', '/', guardNegative, async (ctx) => {
  ctx.request.body.money = Math.floor(Math.random() * (140000 - 40000 + 1)) + 40000;
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: PERMITTED_FIELDS });
    ctx.session.currentUserId = user.id;
    ctx.redirect(ctx.router.url('users'));
  } catch (error) {
    await ctx.render('users/new', {
      user,
      errors: error.errors,
      actionPath: ctx.router.url('users-create'),
      submit_text: "Crear",
    });
  }
});

router.get('user-edit', '/:id/edit', guardPositive, (ctx) => {
  const { user } = ctx.state;
  return ctx.render('users/edit', {
    user,
    actionPath: ctx.router.url('user-update', user.id),
    submit_text: "Guardar",
  });
})

router.post('user-update', '/:id/update', guardPositive, async (ctx) => {
  const { user } = ctx.state;
  user.set(ctx.request.body);
  try {
    await user.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('user', user.id));
  } catch (error) {
    await ctx.render('users/new', {
      user,
      errors: error.errors,
      actionPath: ctx.router.url('users-edit', user.id),
    });
  }
});

router.get('user-delete', '/:id/delete', guardPositive, async (ctx) =>{
  const { user } = ctx.state;
  try {
    await user.destroy();
    ctx.redirect(ctx.router.url('users'));
  } catch (error){
    ctx.redirect('user', user.id);
  }
})

router.get('user', '/:id', guardPositive, async (ctx) => {
  const { user } = ctx.state;
  const sponsor = await ctx.orm.user.findOne({ include: [{ all: true }], where: { id: user.id } });
  const sponsorPets = sponsor.pets;
  return ctx.render('users/show', {
    user,
    userEditPath: ctx.router.url('user-edit', user.id),
    userDeletePath: ctx.router.url('user-delete', user.id),
    usersPath: ctx.router.url('users'),
    petPath: (id) => ctx.router.url('pet', id),
    monitoringPath: (id) => ctx.router.url('pet-monitoring', id),
    pets: await user.getPets(),
    sponsorPets,
    ordersPath: ctx.router.url('user-orders', user.id),
    addMoneyPath: ctx.router.url('user-add-money', user.id),
  });
});

router.get('user-orders', '/records/:id', guardPositive, async (ctx) => {
  const { user } = ctx.state;
  const products = await user.getProducts();
  return ctx.render('users/orders', {
    products,
    productPath: (id) => ctx.router.url('product', id),
    userPath: ctx.router.url('user', user.id),
  });
});

router.get('user-add-money', '/:id/add-money', guardPositive, async (ctx) => {
  const { user } = ctx.state;
  user.money += 10000;
  await user.save({ fields: PERMITTED_FIELDS });
  ctx.redirect(ctx.router.url('user', user.id));
});

module.exports = router;
