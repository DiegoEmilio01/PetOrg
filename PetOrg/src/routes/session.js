const KoaRouter = require('koa-router');
const bcrypt = require('bcrypt');
const { guardNegative } = require('./guards.js');

const router = new KoaRouter();

const renderIndex = async (ctx, permission_error) => {
  await ctx.render('session/index', {
    permission_error: permission_error,
    coordinatorSessionPath: ctx.router.url('session-new-coordinator'),
    userSessionPath: ctx.router.url('session-new-user'),
  });
};

router.get('session-new', '/sign-in', guardNegative, async (ctx) => {
  const permission_error = false;
  await renderIndex(ctx, permission_error);
});

router.get('session-error', '/unauthorized', guardNegative, async (ctx) => {
  const permission_error = true;
  await renderIndex(ctx, permission_error);
});

router.get('session-new-coordinator', '/sign-in-coordinator', guardNegative, async (ctx) => {
  await ctx.render('session/form', {
    error: null,
    msg: 'Login como Coordinador',
    submitPath: ctx.router.url('session-create-coordinator'),
    backPath: ctx.router.url('session-new'),
  });
});

router.get('session-new-user', '/sign-in-user', guardNegative, async (ctx) => {
  await ctx.render('session/form', {
    error: null,
    msg: 'Login como Usuario',
    submitPath: ctx.router.url('session-create-user'),
    backPath: ctx.router.url('session-new'),
  });
});

router.post('session-create-coordinator', '/sign-in-coordinator', guardNegative, async (ctx) => {
  const { email, password } = ctx.request.body;
  try {
    const coordinator = await ctx.orm.coordinator.findOne({ where: { email } });
    const authenticated = await bcrypt.compare(password, coordinator.password);
    if (coordinator && authenticated) {
      ctx.session.currentCoordinatorId = coordinator.id;
      ctx.redirect('/');
    } else {
      await ctx.render('session/form', {
        error: 'Datos de sesión inválidos',
        msg: 'Login como Coordinador',
        submitPath: ctx.router.url('session-create-coordinator'),
        backPath: ctx.router.url('session-new'),
      });
    }
  } catch (e) {
    await ctx.render('session/form', {
      error: 'Datos de sesión inválidos',
      msg: 'Login como Coordinador',
      submitPath: ctx.router.url('session-create-coordinator'),
      backPath: ctx.router.url('session-new'),
    });
  }
});

router.post('session-create-user', '/sign-in-user', guardNegative, async (ctx) => {
  const { email, password } = ctx.request.body;
  try {
    const user = await ctx.orm.user.findOne({ where: { email } });
    const authenticated = await bcrypt.compare(password, user.password);
    if (user && authenticated) {
      ctx.session.currentUserId = user.id;
      ctx.redirect('/');
    } else {
      await ctx.render('session/form', {
        error: 'Datos de sesión inválidos',
        msg: 'Login como Usuario',
        submitPath: ctx.router.url('session-create-user'),
        backPath: ctx.router.url('session-new'),
      });
    }
  } catch (e) {
    await ctx.render('session/form', {
      error: 'Datos de sesión inválidos',
      msg: 'Login como Usuario',
      submitPath: ctx.router.url('session-create-user'),
      backPath: ctx.router.url('session-new'),
    });
  }
});

router.delete('session-destroy', '/', async (ctx) => {
  ctx.session.currentUserId = null;
  ctx.session.currentCoordinatorId = null;
  ctx.redirect('/');
});

module.exports = router;
