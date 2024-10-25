import mongoose from 'mongoose'
import { Cat } from 'src/cats/schemas/cat.schema'

export function responseHandler(response: {
  statusCode: number
  data:
    | string
    | Cat[]
    | Cat
    | mongoose.UpdateWriteOpResult
    | mongoose.mongo.DeleteResult
  message: string
  success: boolean
}) {
  if (response && response?.success)
    return {
      statusCode: response?.statusCode,
      data: response?.data,
      message: response?.message,
    }
  else
    return {
      statusCode: response?.statusCode,
      data: response?.data,
      message: response?.message,
    }
}
