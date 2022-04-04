import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Resurant } from '../resturant/schemas/resturant.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Find all users
  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  // Find user by id
  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  // update user by id
  async updateById(id: string, user: UserDto): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      })
      .exec();
  }

  // delete user by id
  async deleteById(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  // create user
  async create(user: UserDto): Promise<UserDocument> {
    return await this.userModel.create(user);
  }

  //list of users for a specific Cuisine
  async listByCuisine(cuisine: string): Promise<UserDocument[]> {
    const pipeline = [
      // match users with 'burgers' in their favorite cuisines
      {
        $match: {
          favoriteCuisines: {
            $in: [cuisine],
          },
        },
      },
      // join users with their favorite restaurants
      {
        $lookup: {
          from: 'resturants',
          localField: 'resturants',
          foreignField: '_id',
          as: 'resturants',
        },
      },
      // filter out the resturants that don't have the cuisine
      {
        $unwind: {
          path: '$resturants',
          preserveNullAndEmptyArrays: true,
        },
      },
      // filter by cuisine
      {
        $match: {
          'resturants.cuisine': cuisine,
        },
      },
    ];

    return await this.userModel.aggregate(pipeline).exec();
  }
}
