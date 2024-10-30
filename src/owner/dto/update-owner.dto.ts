import { IsNumber, IsString, ValidateNested, IsOptional } from 'class-validator'
import { PartialAddressDto } from './partial-address.dto'
import { Type } from 'class-transformer'

export class UpdateOwnerDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsNumber()
  age?: number

  @ValidateNested()
  @Type(() => PartialAddressDto)
  @IsOptional()
  address?: PartialAddressDto
}
