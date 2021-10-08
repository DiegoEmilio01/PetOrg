exports.apiGuardCoord = (ctx, next) => {
    const { jwtDecoded: { sub, role } } = ctx.state;
    if (role !== 'coordinator') ctx.throw(401);
    return next();
  };