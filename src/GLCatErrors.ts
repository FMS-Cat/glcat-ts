export const GLCatErrors = {
  get UnexpectedNullError(): Error {
    const error = new Error( 'GLCat: Unexpected null detected' );
    error.name = 'UnexpectedNullError';
    return error;
  },
  get WebGL2ExclusiveError(): Error {
    const error = new Error( 'GLCat: Attempted to use WebGL2 exclusive stuff' );
    error.name = 'WebGL2ExclusiveError';
    return error;
  }
};
