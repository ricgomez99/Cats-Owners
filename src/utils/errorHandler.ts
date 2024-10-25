import { HttpException } from '@nestjs/common'

export function errorHandler(error: {
  statusCode: number
  data: string | any[]
  message: string
}) {
  throw new HttpException(
    {
      status: error?.statusCode ?? 500,
      message: error?.message ?? 'Internal server error',
      data: error?.data ?? [],
    },
    error?.statusCode ?? 500,
  )
}
