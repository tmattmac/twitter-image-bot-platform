const knex = require('../db');

const getOrCreateUser = (id, profile) => {
  const [user] = await knex('users')
    .insert({
      id,
      displayName: profile.displayName
    })
    .onConflict('id').merge()
    .returning(['id', 'displayName']);
  return user;
}