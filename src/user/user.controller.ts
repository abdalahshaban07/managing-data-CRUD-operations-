import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';
import { UserService } from './user.service';
import { handleNotFound } from '../shared/handleNotFoundResturant';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userServ: UserService) {}

  // Find all users
  @Get()
  async findAll(@Res() res: Response) {
    try {
      let users = await this.userServ.findAll();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  // Find by Id
  @Get('/:id')
  async findById(@Res() res: Response, @Param('id') id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid ID' });
      let user = await this.userServ.findById(id);

      return handleNotFound(res, user);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  // delete by Id
  @Delete('/:id')
  async deleteById(@Res() res: Response, @Param('id') id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid ID' });
      let user = await this.userServ.deleteById(id);

      return handleNotFound(res, user);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  // create user
  @Post()
  async create(@Res() res: Response, @Body() user: UserDto) {
    try {
      let newUser = await this.userServ.create(user);
      return res.status(HttpStatus.OK).json(newUser);
    } catch (error) {
      console.log({ error });

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  // update user
  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() user: UserDto,
  ) {
    try {
      let updated = await this.userServ.updateById(id, user);
      return handleNotFound(res, updated);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  // retrieve a list of users for a specific Cuisine
  @Get('/cuisine/:cuisine')
  async findByCuisine(@Res() res: Response, @Param('cuisine') cuisine: string) {
    console.log({ cuisine });

    try {
      let users = await this.userServ.listByCuisine(cuisine);
      console.log({ users });

      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.log({ error });

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
}
