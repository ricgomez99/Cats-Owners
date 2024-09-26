import { Module } from '@nestjs/common'
// import { AppController } from './app.controller'
// import { AppService } from './app.service'
import { CatsModule } from './cats/cats.module'
import { MongooseModule } from '@nestjs/mongoose'

const uri = process.env.API_URI
@Module({
  imports: [CatsModule, MongooseModule.forRoot(uri)],
})
export class AppModule {}
