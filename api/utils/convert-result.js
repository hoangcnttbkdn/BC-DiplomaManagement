const convertResult = (result) => {
  return JSON.parse(result.toString());
};

module.exports = { convertResult };
