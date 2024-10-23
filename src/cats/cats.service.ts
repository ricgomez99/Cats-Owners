import { Injectable } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './schemas/cat.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto) {
    try {
      const cat = new this.catModel(createCatDto)
      const result = await cat.save()

      return { statusCode: 201, message: 'cat created', data: result }
    } catch (error) {
      console.log(error)
    }
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
    try {
      const result = this.catModel.updateOne({ _id: id }, updateCatDto)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async remove(id: string) {
    try {
      const result = this.catModel.deleteOne({ _id: id })
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
