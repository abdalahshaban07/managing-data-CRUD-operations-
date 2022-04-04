import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ILocation } from '../interfaces/resturatn';
import { LocationDto } from './location.dto';

export class CreateResturantDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @IsString({
    message: 'Name must be a string',
  })
  name: string;

  @IsNotEmpty({
    message: 'uniqueName is required',
  })
  @IsString({
    message: 'uniqueName must be a string',
  })
  uniqueName: string;

  @IsNotEmpty({
    message: 'cuisine is required',
  })
  @IsString({
    message: 'cuisine must be a string',
  })
  cuisine: string;

  @IsObject({
    message: 'location must be an object',
  })
  @IsNotEmpty({
    message: 'location is required',
  })
  @IsNotEmptyObject({
    nullable: false,
  })
  @ValidateNested()
  @Type(() => LocationDto)
  location: ILocation;
}
