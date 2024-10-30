import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCatDto } from './dto/create-cat.dto'
import { UpdateCatDto } from './dto/update-cat.dto'
import { Cat } from './schemas/cat.schema'
import mongoose, { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { errorHandler } from '../utils/errorHandler'
import { responseHandler } from '../utils/responseHandler'

const EXCLUDE_FIELDS = '-__v'
@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto) {
    try {
      const cat = new this.catModel(createCatDto)
      const result = await cat.save()

      return responseHandler({
        statusCode: 201,
        data: result,
        message: 'cat created',
        success: true,
      })
    } catch (error) {
      if (error instanceof Error) {
        return errorHandler({
          statusCode: 400,
          data: [],
          message: error.message,
        })
      }
    }
  }

  async findAll() {
    try {
      const cats = await this.catModel.find().select(EXCLUDE_FIELDS).exec()
      return responseHandler({
        statusCode: 200,
        message: 'Ok',
        data: cats,
        success: true,
      })
    } catch (error) {
      if (error instanceof Error) {
        return errorHandler({
          statusCode: 400,
          data: [],
          message: error.message,
        })
      }
    }
  }

  async findOne(id: string) {
    try {
      const catById = await this.catModel
        .findOne({ _id: id })
        .select(EXCLUDE_FIELDS)
        .exec()

      if (!catById) {
        throw new NotFoundException('Cat not found')
      }

      return responseHandler({
        statusCode: 200,
        data: catById,
        message: 'OK',
        success: true,
      })
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return errorHandler({
          statusCode: 400,
          data: error.reason.message,
          message: error.message,
        })
      }

      if (error instanceof NotFoundException) {
        return errorHandler({
          statusCode: 404,
          data: error.name,
          message: error.message,
        })
      }
    }
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    try {
      const result = await this.catModel.updateOne({ _id: id }, updateCatDto)

      return result
        ? responseHandler({
            statusCode: 201,
            message: 'cat updated successfully',
            data: result,
            success: true,
          })
        : responseHandler({
            statusCode: 404,
            message: 'unable to update cat',
            data: result,
            success: false,
          })
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return errorHandler({
          statusCode: 400,
          data: error.reason.message,
          message: error.message,
        })
      }
    }
  }

  async remove(id: string) {
    try {
      const result = await this.catModel.deleteOne({ _id: id })

      return responseHandler({
        statusCode: 201,
        message: 'cat deleted successfully',
        data: result,
        success: true,
      })
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        console.log(error, 'type: ', typeof error)
        return errorHandler({
          statusCode: 400,
          data: error.reason.message,
          message: error.message,
        })
      }
    }
  }
}
