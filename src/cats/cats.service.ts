import { Injectable } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './schemas/cat.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new this.catModel(createCatDto)
    return cat.save()
  }

  async findAll(): Promise<Cat[]> {
    const cats = await this.catModel.find().exec()
    return cats
  }

  async findOne(id: number): Promise<Cat> {
    const catById = await this.catModel.findOne({ id: id })
    return catById
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`
  }

  remove(id: number) {
    return `This action removes a #${id} cat`
  }
}
