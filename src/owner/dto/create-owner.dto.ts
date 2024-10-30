import { AddressDto } from './address.dto'
import { IsNumber, IsString, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
export class CreateOwnerDto {
  @IsString()
  name: string

  @IsNumber()
  age: number

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto
}
