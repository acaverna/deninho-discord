exports.salvarPontos = (db, user, points) => {
  users = [];

  const cassino = db.collection("cassino");
  cassino
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        userDoc = doc.data();

        users.push(userDoc.user);

        if (user == userDoc.user) {
          doc.ref.update({
            points: userDoc.points + points,
            plays: userDoc.plays + 1,
          });
        }
      });

      if (!users.includes(user)) {
        let userDoc = cassino.doc(user);

        userDoc.set({
          user: user,
          points: points,
          plays: 1,
        });
      }
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
};
