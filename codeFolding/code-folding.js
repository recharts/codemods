/**
 * Transforms:
 *
 * const data = [...]
 *
 * to:
 *
 * // #region Sample data
 * const data = [...]
 * // #endregion
 */

function isDataArrayDeclaration(node) {
  if (node.type !== 'VariableDeclaration' || node.kind !== 'const') {
    return false;
  }
  
  const declaration = node.declarations[0];
  return (
    declaration &&
    declaration.id.type === 'Identifier' &&
    declaration.id.name.startsWith('data') &&
    declaration.init &&
    declaration.init.type === 'ArrayExpression'
  );
}

module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  
  const processed = new Set();

  root
    .find(j.Program)
    .forEach(programPath => {
      const body = programPath.node.body;
      
      for (let i = 0; i < body.length; i++) {
        const node = body[i];
        
        if (processed.has(node) || !isDataArrayDeclaration(node)) {
          continue;
        }
        
        // Check if already has region comments
        const leadingComments = node.comments || [];
        const hasRegion = leadingComments.some(
          comment => comment.value && comment.value.includes('#region')
        );
        
        if (hasRegion) {
          continue;
        }
        
        // Find consecutive data declarations
        let lastIndex = i;
        while (
          lastIndex + 1 < body.length &&
          isDataArrayDeclaration(body[lastIndex + 1])
        ) {
          lastIndex++;
        }
        
        // Mark all as processed
        for (let j = i; j <= lastIndex; j++) {
          processed.add(body[j]);
        }
        
        // Add #region comment before the first declaration
        node.comments = [
          j.commentLine(' #region Sample data', true, false),
          ...leadingComments
        ];
        
        // Add #endregion comment before the next statement after the last data declaration
        if (lastIndex + 1 < body.length) {
          const nextNode = body[lastIndex + 1];
          const nextComments = nextNode.comments || [];
          const hasEndRegion = nextComments.some(
            comment => comment.value && comment.value.includes('#endregion')
          );
          
          if (!hasEndRegion) {
            nextNode.comments = [
              j.commentLine(' #endregion', true, false),
              ...nextComments
            ];
          }
        }
      }
    });

  return root.toSource({ lineTerminator: '\n' });
};
