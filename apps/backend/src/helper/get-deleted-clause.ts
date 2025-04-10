import { IsNull, Not } from 'typeorm';

export const getDeletedClause = (deleted?: boolean) =>
  deleted ? Not(IsNull()) : IsNull();
