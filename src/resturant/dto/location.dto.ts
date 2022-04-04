import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LocationDto {
  @IsOptional()
  @IsString({
    message: 'type must be a string',
  })
  type: string;

  @IsArray({
    message: 'coordinates must be an array',
  })
  @ArrayNotEmpty({
    message: 'coordinates must not be empty',
  })
  @ArrayMinSize(2, {
    message: 'coordinates must have at least 2 elements',
  })
  @ArrayMaxSize(2, {
    message: 'coordinates must have at most 2 elements',
  })
  @IsInt({
    message: 'coordinates must be an integer',
    each: true,
  })
  coordinates: [Number];
}
