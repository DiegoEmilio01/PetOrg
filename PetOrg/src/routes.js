const KoaRouter = require('koa-router');

const index = require('./routes/index');
const products = require('./routes/products');
const pets = require('./routes/pets');
const events = require('./routes/events');
const coordinators = require('./routes/coordinators');
const newsitems = require('./routes/newsitems');
const reports = require('./routes/reports');
const users = require('./routes/users');
const session = require('./routes/session');
const animals = require('./routes/animals');
const jobs = require('./routes/jobs');
const cart = require('./routes/cart');
const auth = require('./routes/auth');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    switch(err.status) {
      case 401:
        ctx.app.emit('error', err, ctx);
        ctx.redirect(ctx.router.url('session-error'));
        break;
      case 418:
        ctx.app.emit('error', err, ctx);
        ctx.redirect(ctx.router.url('index-unauthorized'));
        break;
      default:
        throw err;
    }
  } 
})

router.use(async (ctx, next) => {
  let paths = [];
  if (ctx.session.currentCoordinatorId) {
    ctx.state.currentCoordinator = await ctx.orm.coordinator.findByPk(ctx.session.currentCoordinatorId);
    paths.push(
      { id: 0, url: ctx.router.url('coordinators'), text: "Coordinadores" },
      { id: 1, url: ctx.router.url('users'), text: "Usuarios" },
      { id: 2, url: ctx.router.url('pets'), text: "Mascotas" },
      { id: 3, url: ctx.router.url('events'), text: "Eventos" },
      { id: 4, url: ctx.router.url('newsitems'), text: "Noticias" },
      { id: 5, url: ctx.router.url('products'), text: "Productos" },
      { id: 6, url: ctx.router.url('reports'), text: "Reportes" },
      { id: 7, url: ctx.router.url('animals'), text: "Animales" },
      { id: 8, url: ctx.router.url('jobs'), text: "Cargos" },
      { id: 9, url: ctx.router.url('coordinator', ctx.state.currentCoordinator.id), text: "Perfil" },
      { id: 10, url: ctx.router.url('pets-monitoring'), text: "Monitoreo" },
    );
  } else {
    paths.push(
      { id: 0, url: ctx.router.url('pets'), text: "Mascotas" },
      { id: 1, url: ctx.router.url('events'), text: "Eventos" },
      { id: 2, url: ctx.router.url('newsitems'), text: "Noticias" },
      { id: 3, url: ctx.router.url('products'), text: "Productos" },
      { id: 4, url: ctx.router.url('reports'), text: "Reportes" },
    );
    if (ctx.session.currentUserId) {
      ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
      paths.push(
        { id: 5, url: ctx.router.url('user', ctx.state.currentUser.id), text: "Perfil" }
      );
    }
  }
  Object.assign(ctx.state, {
    newSessionPath: ctx.router.url('session-new'),
    destroySessionPath: ctx.router.url('session-destroy'),
    rootPath: ctx.router.url('index'),
    coordinatorsPath: ctx.router.url('coordinators'),
    usersPath: ctx.router.url('users'),
    eventsPath: ctx.router.url('events'),
    newsitemsPath: ctx.router.url('newsitems'),
    petsPath: ctx.router.url('pets'),
    productsPath: ctx.router.url('products'),
    jobsPath: ctx.router.url('jobs'),
    reportsPath: ctx.router.url('reports'),
    animalsPath: ctx.router.url('animals'),
    newUserPath: ctx.router.url('users-new'),
    paths: JSON.stringify(paths),
  });
  return next();
});

router.use('/', index.routes());
router.use('/products', products.routes());
router.use('/pets', pets.routes());
router.use('/events', events.routes());
router.use('/coordinators', coordinators.routes());
router.use('/newsitems', newsitems.routes());
router.use('/reports', reports.routes());
router.use('/users', users.routes());
router.use('/session', session.routes());
router.use('/animals', animals.routes())
router.use('/jobs', jobs.routes());
router.use('/cart', cart.routes());
router.use('/auth', auth.routes());
module.exports = router;
