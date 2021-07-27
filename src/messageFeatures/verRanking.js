exports.verRanking = async (db, username, userId) => {
  rankingString = "";
  const connection = await db.collection("cassino").get();
  const usersBrute = connection._docs();
  const users = [];

  for (i = 0; i < usersBrute.length; i++) {
    let user = connection._docs()[i]._fieldsProto;
    users.push(user);
  }

  users.sort((a, b) => {
    if (Number(a.points.integerValue) > Number(b.points.integerValue)) {
      return -1;
    }
    if (Number(a.points.integerValue) < Number(b.points.integerValue)) {
      return 1;
    }
    if (Number(a.points.integerValue) == Number(b.points.integerValue)) {
      if (Number(a.plays.integerValue) > Number(b.plays.integerValue)) {
        return 1;
      }
      return -1;
    }
  });

  for (i = 0; i < users.length; i++) {
    let user = users[i];

    rankingString += `\n${i + 1}° **${user.user.stringValue}** com **${
      user.points.integerValue
    }** pontos, jogando **${user.plays.integerValue}** vezes`;

    if (user.user.stringValue == username) {
      var userData = user;
    }
  }
  if (userData) {
    rankingString += `\n\n Enquanto você, <@${userId}>, tem **${userData.points.integerValue}** pontos, jogando **${userData.plays.integerValue}** vezes.`;
  } else {
    rankingString += `\n\n Enquanto você, <@${userId}> , **não tem ponto nenhum** :(`;
  }
  return rankingString;
};
