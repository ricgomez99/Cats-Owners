import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { OwnerService } from './owner.service'
import { OwnerController } from './owner.controller'
import { OwnerSchema, Owner } from './schemas/owner.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
