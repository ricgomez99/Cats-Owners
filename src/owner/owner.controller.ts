import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { OwnerService } from './owner.service'
import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    const newOwner = await this.ownerService.create(createOwnerDto)
    return newOwner
  }

  @Get()
  async findAll() {
    const owners = await this.ownerService.findAll()
    return owners
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const owner = await this.ownerService.findOne(id)
    return owner
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ) {
    return this.ownerService.update(id, updateOwnerDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ownerService.remove(id)
  }
}
