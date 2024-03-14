export const getEnvs = () => {
  if (process.env.JWT_SECRET === undefined) {
    throw new Error('JWT_SECRET is not defined');
  }

  return {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
  };
};
