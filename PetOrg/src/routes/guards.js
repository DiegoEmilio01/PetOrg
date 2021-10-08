exports.guardCoord = (ctx, next) => {
  const { currentCoordinator } = ctx.state;
  const { currentUser } = ctx.state;
  if (!currentCoordinator) {
    if (currentUser){
      ctx.throw(418);
    } else {
      ctx.throw(401);
    }
  }
  return next();
};

exports.guardUser = (ctx, next) => {
  const { currentCoordinator } = ctx.state;
  const { currentUser } = ctx.state;
  if (!currentUser) {
    if (currentCoordinator){
      ctx.throw(418);
    } else {
      ctx.throw(401);
    }
  } 
  return next();
}

exports.guardNegative = (ctx, next) => {
  const { currentCoordinator } = ctx.state;
  const { currentUser } = ctx.state;
  if (currentCoordinator || currentUser) ctx.throw(418);
  return next();
}

exports.guardPositive = (ctx, next) => {
  const { id } = ctx.params
  const { currentCoordinator } = ctx.state;
  const { currentUser } = ctx.state;
  if (currentUser) {
    if (currentUser.id !== parseInt(id)) {
      ctx.throw(418);
    }
  } else if (!currentCoordinator) {
    ctx.throw(401);
  }
  return next();
}

exports.guardPrivatePet = async (ctx, next) => {
  const { id } = ctx.params
  const pet = await ctx.orm.pet.findByPk(parseInt(id), {include: ctx.orm.user});
  const { currentCoordinator } = ctx.state;
  const { currentUser } = ctx.state;
  if (currentUser) {
    if (currentUser.id !== pet.user.id) {
      ctx.throw(418);
    }
  } else if (!currentCoordinator) {
    ctx.throw(401);
  }
  return next();
}
