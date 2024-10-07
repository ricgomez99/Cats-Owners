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

  async findOne(id: string): Promise<Cat> {
    const catById = await this.catModel.findOne({ _id: id })
    return catById
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    return this.catModel.updateOne({ _id: id }, updateCatDto)
  }

  async remove(id: string) {
    return this.catModel.deleteOne({ _id: id })
  }
}
