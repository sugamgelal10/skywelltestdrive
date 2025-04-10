import { PageFilterHelperParam } from 'src/interface/pageHelper';
export const pageFilterHelper = (queries: PageFilterHelperParam) => {
  const page = queries.page ? +queries.page : 1;
  const size = queries.size ? +queries.size : 10;
  return {
    skip: (page - 1) * size,
    take: size,
    page,
    size,
  };
};
