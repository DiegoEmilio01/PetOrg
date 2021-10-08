module.exports = function sendSponsorshipEmail(ctx, pet, user) {
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('sponsorship-email', { to: user.email , subject: '[PetOrg] Apadrinación'}, { user, pet });
};
