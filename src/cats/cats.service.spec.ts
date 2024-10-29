import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { getModelToken } from '@nestjs/mongoose'
import { Cat } from './schemas/cat.schema'
import { HttpStatus, NotFoundException } from '@nestjs/common'

const mockCat = {} as Cat
const catById = { data: {}, message: 'OK', statusCode: 200 }
const mockAllCats = { data: {}, message: 'Ok', statusCode: 200 }
const mockCreateCat = { data: {}, message: 'cat created', statusCode: 201 }
const mockDeleteCat = {
  message: 'cat deleted successfully',
  statusCode: 201,
}
const mockUpdateCat = {
  message: 'cat updated successfully',
  statusCode: 201,
}
const mockId = '123'
const mockErrorId = 'error'
const EXCLUDE_FIELDS = '-__v'

class mockCatModel {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({})
  save = jest.fn().mockResolvedValue(mockCat)
  static find = jest.fn().mockReturnThis()
  static create = jest.fn().mockReturnValue(mockCat)
  static updateOne = jest.fn().mockReturnValue({ mockId, mockCat })
  static deleteOne = jest.fn().mockImplementation((id: string) => {
    if (id === mockId) throw new NotFoundException()

    return this
  })
  static exec = jest.fn().mockReturnValue(mockCat)
  static select = jest.fn().mockReturnThis()
  static findOne = jest.fn().mockImplementation((id: string) => {
    if (id === mockErrorId) throw new NotFoundException()

    return this
  })
}

describe('CatsService', () => {
  let service: CatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat.name),
          useValue: mockCatModel,
        },
      ],
    }).compile()

    service = module.get<CatsService>(CatsService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a new cat', async () => {
      const result = await service.create(mockCat)

      expect(result).toEqual(mockCreateCat)
    })
  })

  describe('findAll', () => {
    it('should find all cats', async () => {
      const result = await service.findAll()
      expect(mockCatModel.find).toHaveBeenCalledTimes(1)
      expect(mockCatModel.exec).toHaveBeenCalledTimes(1)
      expect(mockCatModel.select).toHaveBeenCalledTimes(1)
      expect(mockCatModel.select).toHaveBeenCalledWith(EXCLUDE_FIELDS)
      expect(result).toEqual(mockAllCats)
    })
  })

  describe('findOne', () => {
    it('should return a cat by its id', async () => {
      const result = await service.findOne(mockId)
      expect(mockCatModel.findOne).toHaveBeenCalledTimes(1)
      expect(mockCatModel.findOne).toHaveBeenCalledWith({ _id: mockId })
      expect(mockCatModel.exec).toHaveBeenCalledTimes(1)
      expect(mockCatModel.select).toHaveBeenCalledTimes(1)
      expect(mockCatModel.select).toHaveBeenCalledWith(EXCLUDE_FIELDS)
      expect(result).toEqual(catById)
    })

    it('should throw NoFoundException', async () => {
      try {
        await service.findOne(mockErrorId)
      } catch (error: any) {
        expect(error.message).toEqual('Not Found')
        expect(error.status).toEqual(HttpStatus.NOT_FOUND)
        expect(error.name).toEqual('NotFoundException')
      }
    })
  })

  describe('update', () => {
    it('should update a cat', async () => {
      const result = await service.update(mockId, mockCat)
      expect(mockCatModel.updateOne).toHaveBeenCalledTimes(1)
      expect(mockCatModel.updateOne).toHaveBeenCalledWith(
        {
          _id: mockId,
        },
        mockCat,
      )
      expect(result).toEqual({
        data: { mockCat: mockCat, mockId: mockId },
        ...mockUpdateCat,
      })
    })
  })

  describe('delete', () => {
    it('should delete a cat', async () => {
      const result = await service.remove(mockId)
      expect(mockCatModel.deleteOne).toHaveBeenCalledTimes(1)
      expect(mockCatModel.deleteOne).toHaveBeenCalledWith({
        _id: mockId,
      })
      expect(result).toEqual({ ...result, ...mockDeleteCat })
    })
  })
})
