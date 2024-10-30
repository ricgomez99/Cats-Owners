import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Owner } from './schemas/owner.schema'
import mongoose, { Model } from 'mongoose'
import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'
import { errorHandler } from '../utils/errorHandler'
import deepMerge from '../utils/deepMerge'

const EXCLUDE_FIELDS = '-__v'
@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}

  async create(createOwnerDto: CreateOwnerDto) {
    try {
      const newOwner = new this.ownerModel(createOwnerDto)
      const result = await newOwner.save()

      return {
        statusCode: 201,
        data: result,
        message: 'owner created successfully',
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
      const existingOwner = await this.ownerModel.findOne({ _id: id }).exec()

      if (!existingOwner) {
        throw new NotFoundException('Owner not found')
      }

      const result = await this.ownerModel
        .findById(id)
        .select(EXCLUDE_FIELDS)
        .exec()
      console.log('result: ', result)

      return { statusCode: 200, data: result, message: 'OK' }
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

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    try {
      const existingOwner = await this.ownerModel.findById(id).exec()

      if (!existingOwner) {
        throw new NotFoundException('Owner not found')
      }

      const updatedOwner = deepMerge(existingOwner.toObject(), updateOwnerDto)
      const result = await this.ownerModel
        .findByIdAndUpdate(id, updatedOwner, {
          new: true,
        })
        .select(EXCLUDE_FIELDS)
        .exec()

      return {
        statusCode: 201,
        data: result,
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

      if (error instanceof NotFoundException) {
        return errorHandler({
          statusCode: 404,
          data: error.name,
          message: error.message,
        })
      }
    }
  }

  async remove(id: string) {
    try {
      const existingOwner = await this.ownerModel.findById(id)

      if (!existingOwner) {
        throw new NotFoundException('Owner not found')
      }

      const result = await this.ownerModel
        .findByIdAndDelete(id)
        .select(EXCLUDE_FIELDS)
        .exec()
      return {
        statusCode: 201,
        data: result,
        message: 'owner deleted successfully',
      }
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
}
