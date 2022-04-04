import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({
    message: 'Full name is required',
  })
  @IsString({
    message: 'fullName must be a string',
  })
  fullName: string;

  @IsOptional()
  @IsArray({
    message: 'favoriteCuisines must be an array',
  })
  @ArrayNotEmpty({
    message: 'favoriteCuisines must not be empty',
  })
  @IsString({
    message: 'favoriteCuisines item must be a string',
    each: true,
  })
  favoriteCuisines: [string];

  @IsOptional()
  @IsArray({
    message: 'resturants must be an array',
  })
  @ArrayNotEmpty({
    message: 'resturants must not be empty',
  })
  // @IsString({
  //   message: 'resturants item must be a string',
  //   each: true,
  // })
  @IsMongoId({
    message: 'resturants item must be valid id',
    each: true,
  })
  resturants: [];
}
