export type User = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  id: number;
};

export type JWTS = {
  accessToken: string;
  refreshToken: string;
};
