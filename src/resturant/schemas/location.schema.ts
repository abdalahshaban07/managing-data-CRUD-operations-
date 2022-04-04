import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ collection: 'resturants', autoIndex: true })
export class Location {
  @Prop({ required: false, type: String, default: 'Point' })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: string;
}
export const LocationSchema = SchemaFactory.createForClass(Location);
