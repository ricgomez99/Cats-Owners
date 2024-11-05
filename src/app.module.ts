import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { CatsModule } from './cats/cats.module'
import { MongooseModule } from '@nestjs/mongoose'
import { OwnerModule } from './owner/owner.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.API_URI),
    CatsModule,
    OwnerModule,
  ],
})
export class AppModule {}
