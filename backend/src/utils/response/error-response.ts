export const errorResponse = (e: unknown) => {
  const error = e as Error;

  return {
    message: error.message,
  };
};
