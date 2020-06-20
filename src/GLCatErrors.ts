export const GLCatErrors = {
  get UnexpectedNullError() {
    const error = new Error( 'GLCat: Unexpected null detected' );
    error.name = 'UnexpectedNullError';
    throw error;
  },
  get WebGL2ExclusiveError() {
    const error = new Error( 'GLCat: Attempted to use WebGL2 exclusive stuff' );
    error.name = 'WebGL2ExclusiveError';
    return error;
  }
};
