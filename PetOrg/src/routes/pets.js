const KoaRouter = require('koa-router');
const { guardCoord, guardUser, guardPrivatePet } = require('./guards.js');
const { Op } = require("sequelize");
const router = new KoaRouter();

const sendSponsorshipEmail = require('../mailers/sponsorship');
const sendAdoptEmail = require('../mailers/adopt');

const PERMITED_FIELDS = [
  'name',
  'age',
  'sex',
  'size',
  'can_sponsor',
  'description',
  'userId',
  'animalId',
  'photo',
  'message',
  'petId',
  'date'
];

router.param('id', async (id, ctx, next) => {
  const pet = await ctx.orm.pet.findByPk(id, {include: ctx.orm.user});
	if (!pet) ctx.throw(404);
	ctx.state.pet = pet;
	return next();
});

router.get('petsJson', '/petsJson', async (ctx) =>{
  const pets = await ctx.orm.pet.findAll({include: ctx.orm.animal});
  switch (ctx.accepts(['json'])) {
    case 'json':
      ctx.body = pets.map((pet) => {
        pet.dataValues.path = ctx.router.url('pet', pet.id);
        pet.dataValues.photoPath = ctx.state.cloudinary.url(pet.photo);
        return pet
        });
      break;
    default:
      break;
  }
})

router.get('pets', '/', async (ctx) => {
	const pets = await ctx.orm.pet.findAll({include: ctx.orm.animal});
	await ctx.render('pets/index', {
    pets,
    petPath: (id) => ctx.router.url('pet', id),
    newPetPath: ctx.router.url('pets-new'),
    indexPath: ctx.router.url('index'),
	});
});

router.get('pets-monitoring', '/monitoring', guardCoord, async (ctx) => {
	const adopted_pets = await ctx.orm.pet.findAll({
    where:{
      userId:{[Op.not]: null,}
    },
    include: ctx.orm.user
  });
	await ctx.render('monitoring/adopted_pets', {
    adopted_pets,
    petPath: (id) => ctx.router.url('pet', id),
    userPath: (id) => ctx.router.url('user', id),
    monitoringPath: (id) => ctx.router.url('pet-monitoring', id),
    indexPath: ctx.router.url('index'),
	});
});

router.get('pet-monitoring', '/monitoring/:id', guardPrivatePet, async (ctx) => {
  const { pet } = ctx.state;
  const monitoring_tickets = await ctx.orm.monitoring_ticket.findAll({where: {petId:pet.id}})
	await ctx.render('monitoring/monitoring_show', {
    pet,
    monitoring_tickets,
    petPath: (id) => ctx.router.url('pet', id),
    userPath: (id) => ctx.router.url('user', id),
    petsMonitoringPath: ctx.router.url('pets-monitoring'),
	});
});

router.post('pet-monitoring-ticket', '/monitoring/:id', async (ctx) => {
  const { pet, cloudinary} = ctx.state;
  const monitoring_ticket = ctx.orm.monitoring_ticket.build(ctx.request.body);
  monitoring_ticket.petId = pet.id;
  const monitoring_tickets = await ctx.orm.monitoring_ticket.findAll({where: {petId:pet.id}})
  console.log('Submiting ticket', monitoring_ticket)
  try{
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      monitoring_ticket.photo = uploadedPhoto.public_id;
    }
    console.log('Submiting ticket step 2', monitoring_ticket)
    await monitoring_ticket.save({ fields: PERMITED_FIELDS });
    ctx.redirect(ctx.router.url('pet-monitoring', pet.id));
  } catch (error) {
    await ctx.render('monitoring/monitoring_show', {
      pet,
      monitoring_tickets,
      petPath: (id) => ctx.router.url('pet', id),
      userPath: (id) => ctx.router.url('user', id),
      petsMonitoringPath: ctx.router.url('pets-monitoring'),
      errors: error.errors,
  });
  }

})


router.get('pets-new', '/new', guardCoord, async (ctx) => {
  const pet = ctx.orm.pet.build();
  const animals = await ctx.orm.animal.findAll();
	return ctx.render('pets/new', {
    pet,
    animals,
    createPetPath:ctx.router.url('pets-create'),
  });
});

router.post('pets-create', '/', guardCoord, async (ctx) => {
  const pet = ctx.orm.pet.build(ctx.request.body);
  const { cloudinary } = ctx.state;
  const animals = await ctx.orm.animal.findAll();
  try{
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      pet.photo = uploadedPhoto.public_id;
    }
    await pet.save({ fields: PERMITED_FIELDS });
    ctx.redirect(ctx.router.url('pets'));
  } catch (error) {
    await ctx.render('pets/new', {
      pet,
      animals,
      errors: error.errors,
      animals,
      createPetPath: ctx.router.url('pets-create'),
  });
  }
});

router.get('pet-edit','/edit/:id', guardCoord, async (ctx) => {
  const { pet } = ctx.state;
  const animals = await ctx.orm.animal.findAll();
	return ctx.render('pets/edit', {
    pet,
    animals,
    petPath: ctx.router.url('pet', pet.id),
    updatePetPath: ctx.router.url('pets-update',pet.id),
    user: await pet.getUser(), // eliminar esto mas adelante
  });
});

router.post('pets-update', '/:id', guardCoord, async (ctx) => {
  const { pet, cloudinary } = ctx.state;
  const animals = await ctx.orm.animal.findAll();
  try{
    const { photo } = ctx.request.files;
    if (photo.size > 0){
      const uploadedPhoto = await cloudinary.uploader.upload(photo.path);
      ctx.request.body.photo = uploadedPhoto.public_id;
    }
    await pet.update(ctx.request.body, { fields: PERMITED_FIELDS } );
    ctx.redirect(ctx.router.url('pet', pet.id));
  } catch (error) {
    await ctx.render('pets/edit', {
      pet,
      animals,
      errors: error.errors,
      petPath: ctx.router.url('pet', pet.id),
      updatePetPath: ctx.router.url('pets-update', pet.id),
  });
  }
});

router.get('pet-delete', '/delete/:id', guardCoord, async (ctx) => {
  const { pet } = ctx.state;
  await pet.destroy();
  ctx.redirect(ctx.router.url('pets'));
});

router.get('pet', '/:id', async (ctx) => {
  const { pet } = ctx.state;
  const animal = await pet.getAnimal();
  let sponsor = false;
  if (ctx.state.currentUser) {
    const petId = pet.id;
    const userId = ctx.state.currentUser.id;
    sponsor = await ctx.orm.sponsorship.findOne({ where: { userId, petId }, attributes: ['id', 'userId', 'petId'] });
  }
  return ctx.render('pets/show', {
    pet,
    animal,
    adoptPetPath: ctx.router.url('adopt-pet', pet.id),
    editPetPath: ctx.router.url('pet-edit', pet.id),
    petsPath: ctx.router.url('pets'),
    deletePetPath: ctx.router.url('pet-delete', pet.id),
    user: await pet.getUser(),
    sponsorPath: ctx.router.url('sponsor', pet.id),
    destroySponsorPath: ctx.router.url('sponsor-delete', pet.id),
    sponsor,
  });
});

router.get('sponsor', '/sponsor/:id', guardUser, async (ctx) => {
  const { pet } = ctx.state;
  const userId = ctx.state.currentUser.id;
  const petId = pet.id;
  const sponsorship = ctx.orm.sponsorship.build({ userId, petId });
  await sponsorship.save();
  // send email here
  sendSponsorshipEmail(ctx, pet, ctx.state.currentUser);
  ctx.redirect(ctx.router.url('pet', pet.id));
});

router.get('sponsor-delete', '/sponsor/delete/:id', guardUser, async (ctx) => {
  const { pet } = ctx.state;
  const petId = pet.id;
  const userId = ctx.state.currentUser.id;
  const sponsor = await ctx.orm.sponsorship.findOne({ where: { userId, petId }, attributes: ['id', 'userId', 'petId'] });
  await sponsor.destroy();

  ctx.redirect(ctx.router.url('pet', pet.id));
});


router.post('adopt-pet', '/:id/adopt', guardUser, async (ctx) => {
  const { pet , currentUser } = ctx.state;
  try {
    await pet.update({userId: currentUser.id, can_sponsor: false}, { fields: PERMITED_FIELDS } );
    const sponsors = await ctx.orm.sponsorship.findAll({where: {petId: pet.id}});
    sponsors.map(async (sponsor) => {await sponsor.destroy()});

    // Send email here
    sendAdoptEmail(ctx, pet, currentUser);

    ctx.redirect(ctx.router.url('pet', pet.id));
  } catch (error) {
    ctx.redirect(ctx.router.url('pet', pet.id));
  }
});

module.exports = router;
