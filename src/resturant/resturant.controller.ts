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
import { CreateResturantDto } from './dto/create-resturant.dto';
import { ResturantService } from './resturant.service';
import { ResurantDocument } from './schemas/resturant.schema';
import { handleNotFoundResturant } from './shared/handleNotFoundResturant';

@Controller('resturant')
export class ResturantController {
  constructor(private resturantServ: ResturantService) {}

  // find all resturants
  @Get()
  async getAll(@Res() res: Response) {
    try {
      let resturant = await this.resturantServ.findAll();
      return res.status(HttpStatus.OK).json(resturant);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  //find By Id
  @Get('/:id')
  async getById(@Res() res: Response, @Param('id') id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid ID' });
      let resturant = await this.resturantServ.findById(id);

      return handleNotFoundResturant(res, resturant);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  //find By UniqueName
  @Get('/unique-name/:uniqueName')
  async getByUniqueName(
    @Res() res: Response,
    @Param('uniqueName') uniqueName: string,
  ) {
    try {
      let resturant = await this.resturantServ.findByUniqueName(uniqueName);
      return handleNotFoundResturant(res, resturant);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  //list By Cuisine
  @Get('/cuisine/:cuisine')
  async getByCuisine(@Res() res: Response, @Param('cuisine') cuisine: string) {
    try {
      let resturant = await this.resturantServ.listByCuisine(cuisine);
      return res.status(HttpStatus.OK).json(resturant);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  //create a new resturant
  @Post()
  async create(
    @Res() res: Response,
    @Body() createResturantDto: CreateResturantDto,
  ) {
    try {
      let resturantExists = await this.resturantServ.findByUniqueName(
        createResturantDto.uniqueName,
      );
      if (resturantExists)
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'Resturant already exists' });

      let created = await this.resturantServ.create(createResturantDto);
      return res.status(HttpStatus.OK).json(created);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  //find nearby restaurants within 1 KM based on location (latitude and longitude)
  @Get('/nearby/:lng/:lat')
  async getNearbyResturants(
    @Res() res: Response,
    @Param('lng') lng: string,
    @Param('lat') lat: string,
  ) {
    try {
      let resturants = await this.resturantServ.findNearbyResturants(
        Number(lng),
        Number(lat),
      );
      return res.status(HttpStatus.OK).json(resturants);
    } catch (error) {
      console.log({ error });

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  // delete a resturant
  @Delete('/:id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid ID' });

      let deleted = await this.resturantServ.delete(id);
      return handleNotFoundResturant(res, deleted);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }

  // update a resturant
  @Put('/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateResturantDto: any,
  ) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Invalid ID' });

      let updated = await this.resturantServ.update(id, updateResturantDto);
      return handleNotFoundResturant(res, updated);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal Server Error' });
    }
  }
}