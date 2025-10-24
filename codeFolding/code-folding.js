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

module.exports = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find(j.VariableDeclaration)
    .forEach(path => {
      const declaration = path.node.declarations[0];
      
      // Check if it's a const declaration with name 'data' and array value
      if (
        path.node.kind === 'const' &&
        declaration.id.type === 'Identifier' &&
        declaration.id.name === 'data' &&
        declaration.init &&
        declaration.init.type === 'ArrayExpression'
      ) {
        // Check if already has region comments
        const leadingComments = path.node.comments || [];
        const hasRegion = leadingComments.some(
          comment => comment.value && comment.value.includes('#region')
        );
        
        if (!hasRegion) {
          // Add #region comment before the declaration
          path.node.comments = [
            j.commentLine(' #region Sample data', true, false),
            ...leadingComments
          ];
          
          // Find the parent body and current position
          const parent = path.parent.value;
          const currentIndex = parent.body.indexOf(path.node);
          
          if (currentIndex !== -1 && currentIndex + 1 < parent.body.length) {
            // Add #endregion comment before the next statement
            const nextNode = parent.body[currentIndex + 1];
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
      }
    });

  return root.toSource({ lineTerminator: '\n' });
};
