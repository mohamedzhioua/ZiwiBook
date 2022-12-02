const DatauriParser = require("datauri/parser");

const parser = new DatauriParser();

const bufferToDataURI = (fileFormat, buffer) =>
  parser.format(fileFormat, buffer);

module.exports = {
  bufferToDataURI,
};
