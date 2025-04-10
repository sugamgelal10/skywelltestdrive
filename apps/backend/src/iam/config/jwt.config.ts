import { registerAs } from '@nestjs/config';

/*
If the configuration module is imported any module, 
the registerAs function will be called, 
and the configuration will be registered.
*/
export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  issuer: process.env.JWT_TOKEN_ISSUER,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
}));
