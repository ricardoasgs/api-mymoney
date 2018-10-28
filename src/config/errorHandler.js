const _ = require("lodash");

/* Arquivo para padronizar os erros do node-restful
  com o mesmo padrão dos demais métodos ( [errors])
*/

const parseErrors = nodeRestfulErrors => {
  const errors = [];
  //itera cada atributo do JSON
  _.forIn(nodeRestfulErrors, error => errors.push(error.message));
  return errors;
};

module.exports = (req, res, next) => {
  // Local onde os erros são retornados na requisição
  const bundle = res.locals.bundle;

  if (bundle.errors) {
    const errors = parseErrors(bundle.errors);
    res.status(500).json({ errors });
  } else {
    next();
  }
};
