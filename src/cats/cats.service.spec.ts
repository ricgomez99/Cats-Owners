import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { getModelToken } from '@nestjs/mongoose'
import { Cat } from './schemas/cat.schema'
import { HttpStatus, NotFoundException } from '@nestjs/common'

const mockCat = {} as Cat
const mockAllCats = { data: {}, message: 'Ok', statusCode: 200 }
const mockId = '123'
const mockErrorId = 'error'
const EXCLUDE_FIELDS = '-__v'

class mockCatModel {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({})
  static save = jest.fn().mockResolvedValue(mockCat)
  static find = jest.fn().mockReturnThis()
  static create = jest.fn().mockReturnValue(mockCat)
  static findOneAndDelete = jest.fn().mockImplementation((id: string) => {
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
    it('should return a cat by its id', async () => {})
  })
})
