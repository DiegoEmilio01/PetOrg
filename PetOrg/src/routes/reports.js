const KoaRouter = require('koa-router');
const { guardCoord } = require('./guards.js');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'location',
  'description',
  'is_closed',
  'date',
  'coordinatorId',
];


router.param('id', async (id, ctx, next) => {
  const report = await ctx.orm.report.findByPk(id);
  if (!report) ctx.throw(404);
  ctx.state.report = report;
  return next();
});

router.get('reports', '/', async (ctx) => {
  const reports = await ctx.orm.report.findAll();
  await ctx.render('reports/index', {
    reports,
    reportPath: (id) => ctx.router.url('report', id),
    newReportPath: ctx.router.url('reports-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('reports-new', '/new', async (ctx) => {
  const report = ctx.orm.report.build();
  return ctx.render('reports/new', {
    report,
    createReportPath: ctx.router.url('reports-create'),
  });
});

router.post('reports-create', '/', async (ctx) => {
  const report = ctx.orm.report.build(ctx.request.body);
  try {
    await report.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('reports'));
  } catch (error) {
    await ctx.render('reports/new', {
      errors: error.errors,
      report,
      createReportPath: ctx.router.url('reports-create'),
    });
  }
});

router.get('reports-edit', '/edit/:id', guardCoord, async (ctx) => {
  const { report } = ctx.state;
  return ctx.render('reports/edit', {
    report,
    updateReportPath: ctx.router.url('reports-update', report.id),
  });
});

router.post('reports-update', '/:id', guardCoord, async (ctx) => {
  const { report } = ctx.state;
  try {
    await report.update(ctx.request.body);
    ctx.redirect(ctx.router.url('report', report.id));
  } catch (error) {
    await ctx.render('reports/edit', {
      errors: error.errors,
      report,
      updateReportPath: ctx.router.url('reports-update', report.id),
    });
  }
});

router.get('report-close', '/close/:id', guardCoord, async (ctx) => {
  const { report } = ctx.state;
  await report.update({ 
    is_closed: true,
    coordinatorId: ctx.state.currentCoordinator.id
  });
  const coordinator = await ctx.orm.coordinator.findByPk(report.coordinatorId);
  return ctx.render('reports/show', {
    report,
    coordinator,
    coordinatorPath: (id) => ctx.router.url('coordinator', id),
    editReportPath: (id) => ctx.router.url('reports-edit', id),
    reportsPath: ctx.router.url('reports'),
    deleteReportPath: (id) => ctx.router.url('report-delete', id),
    closeReportPath: (id) => ctx.router.url('report-close', id),
  });
});

router.get('report', '/:id', async (ctx) => {
  const { report } = ctx.state;
  const coordinator = (report.is_closed) ? await ctx.orm.coordinator.findByPk(report.coordinatorId) : null;
  return ctx.render('reports/show', {
    report,
    coordinator,
    coordinatorPath: (id) => ctx.router.url('coordinator', id),
    editReportPath: (id) => ctx.router.url('reports-edit', id),
    reportsPath: ctx.router.url('reports'),
    deleteReportPath: (id) => ctx.router.url('report-delete', id),
    closeReportPath: (id) => ctx.router.url('report-close', id),
  });
});

router.get('report-delete', '/delete/:id', guardCoord, async (ctx) => {
  const { report } = ctx.state;
  await report.destroy();
  const reports = await ctx.orm.report.findAll();
  await ctx.render('reports/index', {
    reports,
    reportPath: (id) => ctx.router.url('report', id),
    newReportPath: ctx.router.url('reports-new'),
    indexPath: ctx.router.url('index'),
  });
});

module.exports = router;
