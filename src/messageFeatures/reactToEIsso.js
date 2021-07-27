exports.reactToEIsso = (message) => {
  const accepts = ["é isso", "e isso", "É ISSO", "E ISSO"];
  if (accepts.includes(message.content.toLowerCase())) {
    const eisso = "771852824715067412";
    message.react(eisso);
  }
};
