async function resolveUser(client, interaction, userId) {
  if (!userId) return interaction.user;

  try {
    return await client.users.fetch(userId);
  } catch (err) {
    return null;
  }
}

module.exports = resolveUser;