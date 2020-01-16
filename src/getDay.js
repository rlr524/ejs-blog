const date = () => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  const today = new Date();
  return today.toLocaleDateString("en-US", options);
};

module.exports = date;
