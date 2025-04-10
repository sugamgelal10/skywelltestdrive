import { BadRequestException } from '@nestjs/common';
import { sortHelperParam } from 'src/interface/sort-Helper';

export const sortHelper = (queries: sortHelperParam, sortables?: string[]) => {
  const sortBy = queries.sortBy || 'updatedAt';
  const orderBy = queries.orderBy || 'DESC';

  sortables?.push('updatedAt');

  if (sortables && !sortables.includes(sortBy)) {
    throw new BadRequestException('Cannot use ' + sortBy + ' to sort');
  }
  return {
    [sortBy]: orderBy,
  };
};
