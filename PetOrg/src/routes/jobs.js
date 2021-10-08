const KoaRouter = require('koa-router');
const { guardCoord } = require('./guards.js');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'description',
];

router.param('id', async (id, ctx, next) => {
  const job = await ctx.orm.job.findByPk(id);
  if (!job) ctx.throw(404);
  ctx.state.job = job;
  return next();
});

router.get('jobs', '/', guardCoord, async (ctx) => {
  const jobs = await ctx.orm.job.findAll();
  await ctx.render('jobs/index', {
    jobs,
    jobPath: (id) => ctx.router.url('job', id),
    editJobPath: (id) => ctx.router.url('jobs-edit', id),
    deleteJobPath: (id) => ctx.router.url('job-delete', id),
    newJobPath: ctx.router.url('jobs-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('jobs-new', '/new', guardCoord, async (ctx) => {
  const job = ctx.orm.job.build();
  return ctx.render('jobs/new', {
    job,
    createJobPath: ctx.router.url('jobs-create'),
  });
});

router.post('jobs-create', '/', guardCoord, async (ctx) => {
  const job = ctx.orm.job.build(ctx.request.body);
  try {
    await job.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('jobs'));
  } catch (error) {
    await ctx.render('jobs/new', {
      errors: error.errors,
      job,
      createJobPath: ctx.router.url('jobs-create'),
    });
  }
});

router.get('jobs-edit', '/edit/:id', guardCoord, async (ctx) => {
  const { job } = ctx.state;
  return ctx.render('jobs/edit', {
    job,
    updateJobPath: ctx.router.url('jobs-update', job.id),
  });
});

router.post('jobs-update', '/:id', guardCoord, async (ctx) => {
  const { job } = ctx.state;
  try {
    await job.update(ctx.request.body);
    ctx.redirect(ctx.router.url('job', job.id));
  } catch (error) {
    await ctx.render('jobs/edit', {
      errors: error.errors,
      job,
      updateJobPath: ctx.router.url('jobs-update', job.id),
    });
  }
});

router.get('job', '/:id', guardCoord, async (ctx) => {
  const { job } = ctx.state;
  return ctx.render('jobs/show', {
    job,
    editJobPath: (id) => ctx.router.url('jobs-edit', id),
    jobPath: ctx.router.url('jobs'),
    deleteJobPath: (id) => ctx.router.url('job-delete', id),
  });
});

router.get('job-delete', '/delete/:id', guardCoord, async (ctx) => {
  const { job } = ctx.state;
  await job.destroy();
  ctx.redirect(ctx.router.url('jobs'));
});

module.exports = router;
