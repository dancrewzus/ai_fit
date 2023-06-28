import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { User } from '../../users/entities/user.entity';

@Schema()
export class UserData extends Document {

  @Prop({ type: String, required: true, index: true })
  firstName: String;

  @Prop({ type: String, required: false, default: '', index: true })
  secondName?: String;

  @Prop({ type: String, required: true, index: true })
  paternalSurname: String;

  @Prop({ type: String, required: false, default: '', index: true })
  maternalSurname: String;

  @Prop({ type: String, required: false, default: '01/01/1900' })
  birthDate: String;

  @Prop({ type: String, required: false, default: '' })
  profilePicture: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: String, default: Date.now() })
  createdAt?: String;
  
  @Prop({ type: String, default: Date.now() })
  updatedAt?: String;
}

export const UserDataSchema = SchemaFactory.createForClass( UserData )
