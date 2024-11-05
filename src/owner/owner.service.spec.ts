import { Test, TestingModule } from '@nestjs/testing'
import { OwnerService } from './owner.service'
import { getModelToken } from '@nestjs/mongoose'
import { Owner } from './schemas/owner.schema'
import { NotFoundException } from '@nestjs/common'

const mockOwner = {} as Owner
const mockId = '123'
const mockErrorId = 'error'
const EXCLUDE_FIELDS = '-__v'

class ownerModel {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({})
  save = jest.fn().mockResolvedValue(mockOwner)
  static find = jest.fn().mockReturnThis()
  static create = jest.fn().mockReturnValue(mockOwner)
  static findById = jest.fn().mockImplementation((id: string) => {
    if (id === mockErrorId) throw new NotFoundException()
    return this
  })
  static findByIdAndUpdate = jest.fn().mockReturnThis()
  static findByIdAndDelete = jest.fn().mockImplementation((id: string) => {
    if (id === mockId) throw new NotFoundException()
    return this
  })
  static select = jest.fn().mockReturnThis()
  static exec = jest.fn().mockReturnValue(mockOwner)
}

describe('OwnerService', () => {
  let service: OwnerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerService,
        {
          provide: getModelToken(Owner.name),
          useValue: ownerModel,
        },
      ],
    }).compile()

    service = module.get<OwnerService>(OwnerService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a new owner', async () => {
      const result = await service.create(mockOwner)
      expect(result).toEqual({ ...result })
      expect(201)
    })
  })

  describe('findAll', () => {
    it('should return an array of owners', async () => {
      const result = await service.findAll()
      expect(ownerModel.exec).toHaveBeenCalledTimes(1)
      expect(ownerModel.select).toHaveBeenCalledTimes(1)
      expect(ownerModel.select).toHaveBeenCalledWith(EXCLUDE_FIELDS)
      expect(result).toEqual({ ...result })
      expect(200)
    })
  })

  describe('findOne', () => {
    it('should find an owner by its id', async () => {
      const result = await service.findOne(mockId)
      expect(ownerModel.findById).toHaveBeenCalledTimes(1)
      expect(ownerModel.findById).toHaveBeenCalledWith(mockId)
      expect(ownerModel.exec).toHaveBeenCalledTimes(1)
      expect(ownerModel.select).toHaveBeenCalledTimes(1)
      expect(ownerModel.select).toHaveBeenCalledWith(EXCLUDE_FIELDS)
      expect(result).toEqual({ ...result })
      expect(200)
    })
  })
})
