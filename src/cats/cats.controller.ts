import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      const result = await this.catsService.create(createCatDto)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  @Get()
  async findAll() {
    try {
      const result = this.catsService.findAll()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = this.catsService.findOne(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    try {
      const result = this.catsService.update(id, updateCatDto)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = this.catsService.remove(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
