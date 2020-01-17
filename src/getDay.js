const date = () => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  const today = new Date();
  return today.toLocaleDateString("en-US", options);
};

module.exports = date;