import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Resurant } from '../../resturant/schemas/resturant.schema';

export type UserDocument = User & Document;

@Schema({ collection: 'users', autoIndex: true })
export class User {
  @Prop({ required: true, type: String })
  fullName: string;

  @Prop({ type: [String], index: true })
  favoriteCuisines: [string];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'resturants' }] })
  resturants: Resurant[];
}
export const UserSchema = SchemaFactory.createForClass(User);
