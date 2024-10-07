import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Owner } from 'src/owner/schemas/owner.schema'

export type CatDocument = HydratedDocument<Cat>

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  breed: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  owners: Owner[]
}

export const CatSchema = SchemaFactory.createForClass(Cat)
