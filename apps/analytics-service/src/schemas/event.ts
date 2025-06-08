import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {  
  @Prop()
  type: string;

  @Prop({ type: Object})
  message: Record<string, string | number | boolean>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
