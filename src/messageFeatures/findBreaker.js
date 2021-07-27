exports.findBreaker = (breakers, username) => {
  for (i = 0; i < breakers.length; i++) {
    if (breakers[i][0] == username) {
      return i;
    }
  }
  return -1;
};
