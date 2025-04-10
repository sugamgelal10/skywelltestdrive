import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { dataSourceOptions } from '../data-source';

const seedingDataSourceoOptions: DataSourceOptions & SeederOptions = {
  ...dataSourceOptions,
  factories: ['dist/database/factory/**/*.factory.js'],
  seeds: ['dist/database/seeding/**/*.seeder.js'],
};

const dataSource = new DataSource(seedingDataSourceoOptions);
dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
  console.log('Seeding completed......');
  process.exit();
});
//
export default dataSource;
