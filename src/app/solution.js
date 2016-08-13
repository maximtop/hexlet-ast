const singleTagsList = new Set(['hr', 'img', 'br']);

// BEGIN (write your solution here)
export const render = (ast) => {
  const name = ast.name;
  let attributes = ast.attributes;
  attributes = Object.keys(attributes).reduce((acc, key) =>
    `${acc} ${key}="${attributes[key]}"`, '');
  const body = ast.body;
  const children = ast.children.map(render);
  if (singleTagsList.has(name)) {
    return `<${name}${attributes}>`;
  }
  const content = children.length > 0 ? children.join('') : body;
  return `<${name}${attributes}>${content}</${name}>`;
};

export const parse = (data) => {
  const ast = {};
  const name = data[0];
  let value;
  let attributes = {};
  if (data.length === 3) {
    value = data[2];
    attributes = data[1];
  } else if (data.length === 2) {
    if (data[1] instanceof Array || typeof data[1] === 'string') {
      value = data[1];
    } else {
      value = '';
      attributes = data[1];
    }
  } else {
    value = '';
  }
  
  let body = '';
  let children;
  
  if (value instanceof Array) {
    children = value.map(parse);
  } else {
    body = value;
    children = [];
  }
  
  ast.name = name;
  ast.attributes = attributes;
  ast.body = body;
  ast.children = children;
  
  return ast;
};
// END
