const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();
const limit = 10;

const renderIndex = async (ctx, permission_error) => {
  const products = await ctx.orm.product.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
  });
  const pets = await ctx.orm.pet.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
    include: ctx.orm.animal,
  });
  const newsitems = await ctx.orm.newsitem.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
  });
  const events = await ctx.orm.event.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
  });
  const reports = await ctx.orm.report.findAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
  });
  let news = [];
  if (ctx.state.currentCoordinator) {
    news = await ctx.state.currentCoordinator.getNewsitems();
  }
  await ctx.render('index', {
    permission_error: permission_error,
    pets,
    petPath: (id) => ctx.router.url('pet', id),
    products,
    productPath: (id) => ctx.router.url('product', id),
    newsitems,
    newsitemPath: (id) => ctx.router.url('newsitem', id),
    events,
    eventPath: (id) => ctx.router.url('event', id),
    reports,
    reportPath: (id) => ctx.router.url('report', id),
    news,
    productsPath: ctx.router.url('products'),
    coordinatorsPath: ctx.router.url('coordinators'),
    eventsPath: ctx.router.url('events'),
    newsitemsPath: ctx.router.url('newsitems'),
    petsPath: ctx.router.url('pets'),
    reportsPath: ctx.router.url('reports'),
    usersPath: ctx.router.url('users'),
    animalsPath: ctx.router.url('animals'),
  });
};

router.get('index', '/', async (ctx) => {
  const permission_error = false;
  await renderIndex(ctx, permission_error);
});

router.get('index-unauthorized', 'unauthorized', async (ctx) => {
  const permission_error = true;
  await renderIndex(ctx, permission_error);
});


module.exports = router;
