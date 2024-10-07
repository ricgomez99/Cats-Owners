import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
// import { Address } from '../interfaces/address.interface'
import { AddressDto } from '../dto/address.dto'

export type OwnerDocument = HydratedDocument<Owner>

@Schema()
export class Owner {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  address: AddressDto
}

export const OwnerSchema = SchemaFactory.createForClass(Owner)
