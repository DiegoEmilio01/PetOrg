const KoaRouter = require('koa-router');
const { Op } = require("sequelize");
const { guardCoord, guardUser } = require('./guards.js');

const router = new KoaRouter();

const PERMITTED_FIELDS = [
  'name',
  'location',
  'start_hour',
  'end_hour',
  'description',
  'date',
  'photo',
];


router.param('id', async (id, ctx, next) =>{
  const event = await ctx.orm.event.findByPk(id.toString());
  if (!event) ctx.throw(404);
  ctx.state.event = event;
  return next();
});

router.get('events', '/', async (ctx) => {
  const assistable_events = await ctx.orm.event.findAll({
    where: {
      date: {
        [Op.gte]: new Date(),
      },
    }
  });
  const unassistable_events = await ctx.orm.event.findAll({
    where: {
      date: {
        [Op.lt]: new Date(),
      },
    }
  });
  await ctx.render('events/index', {
    assistable_events,
    unassistable_events,
    eventPath: (id) => ctx.router.url('event', id),
    newEventPath: ctx.router.url('events-new'),
    indexPath: ctx.router.url('index'),
  });
});

router.get('events-new', '/new', guardCoord, (ctx) => {
  const event = ctx.orm.event.build();
  const currentDate = new Date().toJSON().split('T')[0];
  return ctx.render('events/new', {
    event,
    currentDate,
    form : "new",
    actionPath: ctx.router.url('events-create'),
    submit_text: "Crear",
  });
});

router.post('events-create', '/', guardCoord, async (ctx) =>{
  const event = ctx.orm.event.build(ctx.request.body);
  const currentDate = new Date().toJSON().split('T')[0];
  const { cloudinary } = ctx.state;
  try {
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      event.photo = uploadedPhoto.public_id;
    }
    await event.save({fields: PERMITTED_FIELDS});
    ctx.redirect(ctx.router.url('events'));
  } catch (error) {
    await ctx.render('events/new', {
      event,
      currentDate,
      form : "new",
      errors: error.errors,
      actionPath: ctx.router.url('events-create'),
      submit_text: "Crear",
    });
  }
});

router.get('event-edit', '/:id/edit', guardCoord, (ctx) => {
  const { event } = ctx.state;
  return ctx.render('events/edit', {
    event,
    form : "edit",
    actionPath: ctx.router.url('event-update', event.id),
    submit_text: "Guardar",
  });
})

router.post('event-update', '/:id/update', guardCoord, async (ctx) => {
  const { event, cloudinary }= ctx.state;
  try {
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      ctx.request.body.photo = uploadedPhoto.public_id;
    }
    await event.update(ctx.request.body, { fields: PERMITTED_FIELDS });
    ctx.redirect(ctx.router.url('event', event.id));
  } catch (error) {
    await ctx.render('events/edit', {
      event,
      form : "edit",
      errors: error.errors,
      actionPath: ctx.router.url('events-edit', event.id),
    });
  }
});

router.get('event-delete', '/:id/delete', guardCoord, async ctx =>{
  const { event } = ctx.state;
  try{
    await event.destroy();
    ctx.redirect(ctx.router.url('events'));
  } catch (error){
    ctx.redirect(ctx.router.url('event', event.id));
    // incorporar error de borrado en show
  }

})

router.post('event-assist', '/:id/assist', guardUser, async (ctx) => {
  const { event , currentUser } = ctx.state;
  const tuple = ctx.orm.assistanceitem.build({userId: currentUser.id, eventId: event.id});
  try {
    await tuple.save();
    ctx.redirect(ctx.router.url('event', event.id));
  } catch (error) {
    ctx.redirect(ctx.router.url('event', event.id));
    // incorporar error de asistencia en show
  }
});

router.post('event-assist-cancel', '/:id/assist/cancel', guardUser, async (ctx) => {
  const { event , currentUser } = ctx.state;
  const tuple = await ctx.orm.assistanceitem.findOne({where: {userId: currentUser.id, eventId: event.id}});
  try {
    await tuple.destroy();
    ctx.redirect(ctx.router.url('event', event.id));
  } catch (error) {
    ctx.redirect(ctx.router.url('event', event.id));
    // incorporar error de asisyarntencia en show
  }
});

router.get('event', '/:id', async (ctx) => {
  const { event } = ctx.state;
  let assist = false;
  const assistants = await event.getUsers();
  if (ctx.state.currentUser) {
    const { currentUser } = ctx.state;
    const assistance = await ctx.orm.assistanceitem.findOne({ where: { userId: currentUser.id, eventId: event.id }});
    if (assistance) {
      assist = true;
    }
  }
  let assistable = await ctx.orm.event.findAll({
    where: {
      date: {
        [Op.gte]: new Date(),
      },
      id: event.id
    }
  });
  assistable = assistable.length !== 0;

  return ctx.render('events/show', {
    numberOfAssistants: assistants.length,
    assistable,
    event,
    eventEditPath: ctx.router.url('event-edit', event.id),
    eventDeletePath: ctx.router.url('event-delete', event.id),
    eventsPath: ctx.router.url('events'),
    eventAssistPath: ctx.router.url('event-assist', event.id),
    eventNotAssistPath: ctx.router.url('event-assist-cancel', event.id),
    assistance: assist,
  });
});


module.exports = router;
