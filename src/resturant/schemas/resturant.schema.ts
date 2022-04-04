import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ILocation } from '../interfaces/resturatn';
import { LocationSchema } from './location.schema';

export type ResurantDocument = Resurant & Document;

@Schema({ collection: 'resturants', autoIndex: true })
export class Resurant {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true, index: true })
  uniqueName: string;

  @Prop({ required: true, type: String })
  cuisine: string;

  @Prop({
    required: true,
    type: LocationSchema,
    index: '2dsphere',
  })
  location: ILocation;
}
export const ResurantSchema = SchemaFactory.createForClass(Resurant);
