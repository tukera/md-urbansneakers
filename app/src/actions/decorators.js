export function propTypes(param) {
  return function propTypesDecorator(clazz) {
    clazz.propTypes = Object.assign({}, clazz.propTypes || {}, param);
    return clazz;
  };
}

export function defaultProps(param) {
  return function defaultPropsDecorator(clazz) {
    clazz.defaultProps = Object.assign({}, clazz.defaultProps || {}, param);
    return clazz;
  };
}

export function contextTypes(param) {
  return function contextTypesDecorator(clazz) {
    clazz.contextTypes = Object.assign({}, clazz.contextTypes || {}, param);
    return clazz;
  };
}

export function childContextTypes(param) {
  return function childContextTypesDecorator(clazz) {
    clazz.childContextTypes = Object.assign({}, clazz.contextTypes || {}, param);
    return clazz;
  };
}
