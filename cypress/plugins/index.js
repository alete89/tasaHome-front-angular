const webpackPreprocessor = require("@cypress/webpack-batteries-included-preprocessor");
const { v4: uuid } = require("uuid");
const filePreprocessor = webpackPreprocessor({ typescript: "typescript" });
module.exports = on => {
  const id = uuid();
  on("file:preprocessor", file => {
    file.outputPath = file.outputPath.replace(/^(.*\/)(.*?)(\..*)$/, `$1$2.${id}$3`);
    return filePreprocessor(file);
  });
};