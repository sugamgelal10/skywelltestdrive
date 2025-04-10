import { BadRequestException } from '@nestjs/common';
import { SearchFilterHelperParam } from 'src/interface/searchHelper';
import { ILike } from 'typeorm';

export const searchFilterHelper = (
  search: SearchFilterHelperParam,
  searchables?: string[],
) => {
  if (
    searchables &&
    search.searchIn &&
    !searchables.includes(search.searchIn)
  ) {
    throw new BadRequestException(
      'Cannot use ' + search.searchIn + ' to search',
    );
  }

  if (search.searchBy && search.searchBy) {
    return {
      [search.searchIn]: ILike(`%${search.searchBy}%`),
    };
  }
  return undefined;
};
