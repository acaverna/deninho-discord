exports.reactToESobreIsso = (message) => {
  const accepts = ["é sobre isso", "é sobre isto"];
  if (accepts.includes(message.content.toLowerCase())) {
    const esobreisso = "850520470318350396";
    message.react(esobreisso);
  }
};
