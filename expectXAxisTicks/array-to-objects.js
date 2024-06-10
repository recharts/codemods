/**
 * Transforms:
 *
 * expectXAxisTicks(container, ['foo', 'bar', 'baz'])
 *
 * to:
 *
 * expectXAxisTicks(container, [{ textContent: 'foo', x: '1', y: '1'}, { textContent: 'bar', x: '1', y: '1'}, { textContent: 'baz', x: '1', y: '1'}])
 */

function shouldTransform(j, ticks) {
  return ticks.type === 'ArrayExpression' && ticks.elements.every(element => element.type === 'StringLiteral');
}

module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.CallExpression, {
      callee: {
          name: 'expectXAxisTicks',
      },
    })
    .forEach(path => {
      const args = path.node.arguments;
      const [_container, ticks] = args;

      if (shouldTransform(j, ticks)) {
        const objects = ticks.elements.map((element, index) => {
          return j.objectExpression([
            j.property('init', j.identifier('textContent'), element),
            j.property('init', j.identifier('x'), j.literal(String(index))),
            j.property('init', j.identifier('y'), j.literal(String(index))),
          ]);
        });

        args[1] = j.arrayExpression(objects);
      }
    });

  return root.toSource();
};
