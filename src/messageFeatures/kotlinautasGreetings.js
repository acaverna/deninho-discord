exports.kotlinautasGreetings = async (reaction, user) => {
  // // When a reaction is received, check if the structure is partial
  // if (reaction.partial) {
  //   // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
  //   try {
  //     await reaction.fetch();
  //   } catch (error) {
  //     console.error("Something went wrong when fetching the message: ", error);
  //     // Return as `reaction.message.author` may be undefined/null
  //     return;
  //   }
  // }
  // 
  // if (
  //   reaction.message.id == "869384946601566210" &&
  //   reaction.emoji.name == "✅"
  // ) {
  //   const kotlinauta = client.guilds.cache
  //     .get("759906666060840991")
  //     .roles.cache.get("869402340233470002");
  //   const member = client.guilds.cache
  //     .get("759906666060840991")
  //     .members.cache.get(user.id);
  // 
  //   member.roles.add(kotlinauta);
  // }
};
