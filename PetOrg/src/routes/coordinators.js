const KoaRouter = require('koa-router');
const { guardCoord } = require('./guards.js');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'jobId',
  'email',
  'password',
];


router.param('id', async (id, ctx, next) => {
  const coordinator = await ctx.orm.coordinator.findByPk(id);
  if (!coordinator) ctx.throw(404);
  ctx.state.coordinator = coordinator;
  return next();
});

router.get('coordinators', '/', guardCoord, async (ctx) => {
  const coordinators = await ctx.orm.coordinator.findAll();
  await ctx.render('coordinators/index', {
    coordinators,
    coordinatorPath: (id) => ctx.router.url('coordinator', id),
    newCoordinatorPath: ctx.router.url('coordinators-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('coordinators-new', '/new', guardCoord, async (ctx) => {
  const coordinator = ctx.orm.coordinator.build();
  const jobs = await ctx.orm.job.findAll();
  return ctx.render('coordinators/new', {
    coordinator,
    jobs,
    createCoordinatorPath: ctx.router.url('coordinators-create'),
  });
});

router.post('coordinators-create', '/', guardCoord, async (ctx) => {
  const coordinator = ctx.orm.coordinator.build(ctx.request.body);
  try {
    await coordinator.save({ fields: PERMITTED_FIELDS });
    ctx.session.currentCoordinatorId = coordinator.id;
    ctx.redirect(ctx.router.url('coordinators'));
  } catch (error) {
    const jobs = await ctx.orm.job.findAll();
    await ctx.render('coordinators/new', {
      errors: error.errors,
      coordinator,
      jobs,
      createCoordinatorPath: ctx.router.url('coordinators-create'),
    });
  }
});

router.get('coordinators-edit', '/edit/:id', guardCoord, async (ctx) => {
  const { coordinator } = ctx.state;
  const jobs = await ctx.orm.job.findAll();
  return ctx.render('coordinators/edit', {
    coordinator,
    jobs,
    updateCoordinatorPath: ctx.router.url('coordinators-update', coordinator.id),
  });
});

router.post('coordinators-update', '/:id', guardCoord, async (ctx) => {
  const { coordinator } = ctx.state;
  try {
    await coordinator.update(ctx.request.body);
    ctx.redirect(ctx.router.url('coordinator', coordinator.id));
  } catch (error) {
    const jobs = await ctx.orm.job.findAll();
    await ctx.render('coordinators/edit', {
      errors: error.errors,
      coordinator,
      jobs,
      updateCoordinatorPath: ctx.router.url('coordinators-update', coordinator.id),
    });
  }
});

router.get('coordinator', '/:id', guardCoord, async (ctx) => {
  const { coordinator } = ctx.state;
  const job = await coordinator.getJob();
  return ctx.render('coordinators/show', {
    coordinator,
    job,
    reports: await coordinator.getReports(),
    reportPath: (id) => ctx.router.url('report', id),
    news: await coordinator.getNewsitems(),
    editCoordinatorPath: (id) => ctx.router.url('coordinators-edit', id),
    coordinatorsPath: ctx.router.url('coordinators'),
    deleteCoordinatorPath: (id) => ctx.router.url('coordinator-delete', id),
  });
});

router.get('coordinator-delete', '/delete/:id', guardCoord, async (ctx) => {
  const { coordinator } = ctx.state;
  await coordinator.destroy();
  const coordinators = await ctx.orm.coordinator.findAll();
  return ctx.render('coordinators/index', {
    coordinators,
    indexPath: ctx.router.url('index'),
    coordinatorPath: (id) => ctx.router.url('coordinator', id),
    newCoordinatorPath: ctx.router.url('coordinators-new'),
  });
});

module.exports = router;
