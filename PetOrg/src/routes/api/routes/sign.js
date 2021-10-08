const KoaRouter = require('koa-router');
const bcrypt = require('bcrypt');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
    'name',
    'email',
    'password',
    'adress',
    'is_volunteer',
    'money',
  ];

router.post('/up', async (ctx) => {
    ctx.request.body.money = Math.floor(Math.random() * (140000 - 40000 + 1)) + 40000;
    const user = ctx.orm.user.build(ctx.request.body);
    try {
      await user.save({ fields: PERMITTED_FIELDS });
      ctx.body = { "message": "User has been created successfully", "success": "true" }
    } catch (error) {
      ctx.body = { "message": error, "success": "false" }
    }
});

router.post('/in-user', async (ctx) => {
  const { email, password } = ctx.request.body;
  try {
    const user = await ctx.orm.user.findOne({ where: { email } });
    const authenticated = await bcrypt.compare(password, user.password);
    if (user && authenticated) {
      ctx.currentUser = user;
      ctx.body = {"message": `Bienvenid@ ${user.name}`, "success": "true"};
    } else {
      ctx.body = { "error": "Datos de sesión inválidos", "success": 'false'};
    }
  } catch (e) {
    ctx.body = { "error": "Datos de sesión inválidos", "success": 'false'};
  }
});

router.post('/in-coord', async (ctx) => {
  const { email, password } = ctx.request.body;
  try {
    const coordinator = await ctx.orm.coordinator.findOne({ where: { email } });
    const authenticated = await bcrypt.compare(password, coordinator.password);
    if (coordinator && authenticated) {
      ctx.currentCoordinator = coordinator;
      ctx.body = {"message": `Bienvenid@ ${coordinator.name}`, "success": "true"};
    } else {
      ctx.body = { "error": "Datos de sesión inválidos", "success": 'false'};
    }
  } catch (e) {
    ctx.body = { "error": "Datos de sesión inválidos", "success": 'false'};
  }
});

module.exports = router;
