import { IsString, IsNumber, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { AddressDto } from './address.dto'

export class CreateOwnerDto {
  @IsString()
  name: string

  @IsNumber()
  age: number

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto
}
