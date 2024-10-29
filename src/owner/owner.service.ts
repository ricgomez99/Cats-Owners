import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Owner } from './schemas/owner.schema'
import mongoose, { Model } from 'mongoose'
import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'
import { errorHandler } from 'src/utils/errorHandler'

const EXCLUDE_FIELDS = '-__v'
@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const newOwner = new this.ownerModel(createOwnerDto)
    return newOwner.save()
  }

  async findAll() {
    try {
      const owners = await this.ownerModel.find().select(EXCLUDE_FIELDS).exec()
      return { statusCode: 200, data: owners, message: 'OK' }
    } catch (error) {
      return errorHandler({ data: [], message: error.message, statusCode: 400 })
    }
  }

  async findOne(id: string) {
    try {
      const owner = await this.ownerModel
        .findOne({ _id: id })
        .select(EXCLUDE_FIELDS)
        .exec()

      return { statusCode: 200, data: owner, message: 'OK' }
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

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    try {
      const updated = await this.ownerModel.updateOne(
        { _id: id },
        updateOwnerDto,
      )
      return {
        statusCode: 201,
        data: updated,
        message: 'owner updated successfully',
      }
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
    return this.ownerModel.deleteOne({ _id: id })
  }
}
