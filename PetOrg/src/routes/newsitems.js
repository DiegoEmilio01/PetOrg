const KoaRouter = require('koa-router');
const { guardCoord } = require('./guards.js');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'title',
  'content',
  'date',
  'coordinatorId',
  'photo',
];

router.param('id', async (id, ctx, next) => {
  const newsitem = await ctx.orm.newsitem.findByPk(id);
  if (!newsitem) ctx.throw(404);
  ctx.state.newsitem = newsitem;
  return next();
});

router.get('newsitems', '/', async (ctx) => {
  const newsitems = await ctx.orm.newsitem.findAll();
  await ctx.render('newsitems/index', {
    newsitems,
    newsitemPath: (id) => ctx.router.url('newsitem', id),
    newNewsitemPath: ctx.router.url('newsitems-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('newsitems-new', '/new', guardCoord, async (ctx) => {
  const newsitem = ctx.orm.newsitem.build();
  const coordinators = await ctx.orm.coordinator.findAll();
  return ctx.render('newsitems/new', {
    newsitem,
    coordinators,
    createNewsitemPath: ctx.router.url('newsitems-create'),
  });
});

router.post('newsitems-create', '/', guardCoord, async (ctx) => {
  const newsitem = ctx.orm.newsitem.build(ctx.request.body);
  const { cloudinary } = ctx.state;
  try {
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      newsitem.photo = uploadedPhoto.public_id;
    }
    await newsitem.save({ fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('newsitems'));
  } catch (error) {
    const coordinators = await ctx.orm.coordinator.findAll();
    await ctx.render('newsitems/new', {
      errors: error.errors,
      newsitem,
      coordinators,
      createNewsitemPath: ctx.router.url('newsitems-create'),
    });
  }
});

router.get('newsitems-edit', '/edit/:id', guardCoord, async (ctx) => {
  const { newsitem } = ctx.state;
  const coordinators = await ctx.orm.coordinator.findAll();
  return ctx.render('newsitems/edit', {
    newsitem,
    coordinators,
    updateNewsitemPath: ctx.router.url('newsitems-update', newsitem.id),
  });
});

router.post('newsitems-update', '/:id', guardCoord, async (ctx) => {
  const { newsitem, cloudinary} = ctx.state;
  try {
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      ctx.request.body.photo = uploadedPhoto.public_id;
    }
    await newsitem.update(ctx.request.body);
    ctx.redirect(ctx.router.url('newsitem', newsitem.id));
  } catch (error) {
    const coordinators = await ctx.orm.coordinator.findAll();
    await ctx.render('newsitems/edit', {
      errors: error.errors,
      newsitem,
      coordinators,
      updateNewsitemPath: ctx.router.url('newsitems-update', newsitem.id),
    });
  }
});

router.get('newsitem', '/:id', async (ctx) => {
  const { newsitem } = ctx.state;
  return ctx.render('newsitems/show', {
    newsitem,
    editNewsitemPath: (id) => ctx.router.url('newsitems-edit', id),
    newsitemsPath: ctx.router.url('newsitems'),
    deleteNewsitemPath: (id) => ctx.router.url('newsitem-delete', id),
  });
});

router.get('newsitem-delete', '/delete/:id', guardCoord, async (ctx) => {
  const { newsitem } = ctx.state;
  await newsitem.destroy();
  const newsitems = await ctx.orm.newsitem.findAll();
  return ctx.render('newsitems/index', {
    newsitems,
    indexPath: ctx.router.url('index'),
    newsitemPath: (id) => ctx.router.url('newsitem', id),
    newNewsitemPath: ctx.router.url('newsitems-new'),
  });
});

module.exports = router;
