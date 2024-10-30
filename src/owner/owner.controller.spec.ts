import { Test, TestingModule } from '@nestjs/testing'
import { OwnerController } from './owner.controller'
import { OwnerService } from './owner.service'
import { LoggerModule } from 'nestjs-pino'

const mockId = '123'
const mockOwner = {
  name: 'Juan',
  age: 22,
  address: {
    street: 'a street',
    number: 1,
    city: 'Quebec',
  },
}

const mockService = {
  create: jest.fn().mockReturnValue(mockOwner),
  findAll: jest.fn().mockReturnValue([mockOwner]),
  findOne: jest.fn().mockReturnValue(mockOwner),
  update: jest.fn().mockReturnValue(mockOwner),
  remove: jest.fn().mockReturnValue(mockOwner),
}

describe('OwnerController', () => {
  let controller: OwnerController
  let service: OwnerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [OwnerController],
      providers: [{ provide: OwnerService, useValue: mockService }],
    }).compile()

    controller = module.get<OwnerController>(OwnerController)
    service = module.get<OwnerService>(OwnerService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('create', () => {
    it('should create a new owner', async () => {
      const result = await controller.create(mockOwner)
      expect(service.create).toHaveBeenCalledTimes(1)
      expect(service.create).toHaveBeenCalledWith(mockOwner)
      expect(result).toEqual(mockOwner)
      expect(201)
    })
  })

  describe('findAll', () => {
    it('should return all owners', async () => {
      const result = await controller.findAll()
      expect(service.findAll).toHaveBeenCalledTimes(1)
      expect(result).toEqual([mockOwner])
      expect(200)
    })
  })

  describe('findOne', () => {
    it('should return an owner by its id', async () => {
      const result = await controller.findOne(mockId)
      expect(service.findOne).toHaveBeenCalledTimes(1)
      expect(service.findOne).toHaveBeenCalledWith(mockId)
      expect(result).toEqual(mockOwner)
      expect(200)
    })
  })

  describe('update', () => {
    it('should update owner data', async () => {
      const result = await controller.update(mockId, mockOwner)
      expect(service.update).toHaveBeenCalledTimes(1)
      expect(service.update).toHaveBeenCalledWith(mockId, mockOwner)
      expect(result).toEqual(mockOwner)
      expect(201)
    })
  })

  describe('remove', () => {
    it('should remove an owner by its id', async () => {
      const result = await controller.remove(mockId)
      expect(service.remove).toHaveBeenCalledTimes(1)
      expect(service.remove).toHaveBeenCalledWith(mockId)
      expect(result).toEqual(mockOwner)
      expect(201)
    })
  })
})
