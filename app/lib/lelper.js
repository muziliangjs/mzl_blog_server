function success(data) { 
  throw new global.errs.Success({...data})
}

function error(data) {
  throw new global.errs.ParamsError({...data})
}

module.exports = {
  success,
  error
}