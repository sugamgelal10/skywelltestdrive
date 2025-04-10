import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class BaseQuery {
  @IsNumber()
  @IsOptional()
  @Transform((v) => Number(v.value))
  page?: number;

  @IsNumber()
  @IsOptional()
  @Transform((v) => Number(v.value))
  size?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortingOrder)
  orderBy?: SortingOrder;

  @IsOptional()
  @IsBoolean()
  @Transform((v) => {
    if (typeof v.obj.deleted === 'string') {
      if (v.obj.deleted === 'false') {
        return false;
      }
    }
    return Boolean(v.obj.deleted);
  })
  deleted?: boolean;

  @IsOptional()
  @IsString()
  searchIn?: string;

  @IsOptional()
  @IsString()
  searchBy?: string;
}
