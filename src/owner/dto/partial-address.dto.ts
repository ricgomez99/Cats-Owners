import { IsNumber, IsOptional, IsString } from 'class-validator'

export class PartialAddressDto {
  @IsOptional()
  @IsString()
  street: string

  @IsOptional()
  @IsNumber()
  number: number

  @IsOptional()
  @IsString()
  city: string
}
