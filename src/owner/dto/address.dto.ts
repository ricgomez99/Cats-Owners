import { IsString, IsNumber } from 'class-validator'

export class AddressDto {
  @IsString()
  street: string

  @IsNumber()
  number: number

  @IsString()
  city: string
}
