import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Owner } from './schemas/owner.schema'
import { Model } from 'mongoose'
import { CreateOwnerDto } from './dto/create-owner.dto'
import { UpdateOwnerDto } from './dto/update-owner.dto'

@Injectable()
export class OwnerService {
  constructor(@InjectModel(Owner.name) private ownerModel: Model<Owner>) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const newOwner = new this.ownerModel(createOwnerDto)
    return newOwner.save()
  }

  async findAll(): Promise<Owner[]> {
    const owners = await this.ownerModel.find().exec()
    return owners
  }

  async findOne(id: string): Promise<Owner> {
    const owner = await this.ownerModel.findOne({ _id: id })
    return owner
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    return this.ownerModel.updateOne({ _id: id }, updateOwnerDto)
  }

  async remove(id: string) {
    return this.ownerModel.deleteOne({ _id: id })
  }
}
