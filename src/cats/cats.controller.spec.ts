import { Test, TestingModule } from '@nestjs/testing'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { LoggerModule } from 'nestjs-pino'
import { CreateCatDto } from './dto/create-cat.dto'

const mockId = '123'
const mockCat: CreateCatDto = {
  name: 'nina',
  age: 2,
  breed: 'siamese',
}

const mockCatService = {
  create: jest.fn().mockReturnValue(mockCat),
  findAll: jest.fn().mockReturnValue([mockCat]),
  findOne: jest.fn().mockReturnValue(mockCat),
  update: jest.fn().mockReturnValue(mockCat),
  remove: jest.fn().mockReturnValue(mockCat),
}

describe('CatsController', () => {
  let catsController: CatsController
  let catsService: CatsService

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatService,
        },
      ],
    }).compile()

    catsService = moduleRef.get<CatsService>(CatsService)
    catsController = moduleRef.get<CatsController>(CatsController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(catsController).toBeDefined()
  })

  describe('create', () => {
    it('it should create a cat', async () => {
      const result = await catsController.create(mockCat)
      expect(catsService.create).toHaveBeenCalledTimes(1)
      expect(catsService.create).toHaveBeenCalledWith(mockCat)
      expect(result).toEqual(mockCat)
      expect(201)
    })
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const expectedOutput = await catsController.findAll()
      expect(catsService.findAll).toHaveBeenCalledTimes(1)
      expect(expectedOutput).toEqual([mockCat])
      expect(200)
    })
  })

  describe('findOne', () => {
    it('should return a cat by id', async () => {
      const result = await catsController.findOne(mockId)
      expect(catsService.findOne).toHaveBeenCalledTimes(1)
      expect(catsService.findOne).toHaveBeenCalledWith(mockId)
      expect(result).toEqual(mockCat)
      expect(200)
    })
  })

  describe('update', () => {
    it('should update cat data by id and payload', async () => {
      const result = await catsController.update(mockId, mockCat)
      expect(catsService.update).toHaveBeenCalledTimes(1)
      expect(catsService.update).toHaveBeenCalledWith(mockId, mockCat)
      expect(result).toEqual(mockCat)
      expect(201)
    })
  })

  describe('remove', () => {
    it('it should remove a cat by id', async () => {
      const result = await catsController.remove(mockId)
      expect(catsService.remove).toHaveBeenCalledTimes(1)
      expect(catsService.remove).toHaveBeenCalledWith(mockId)
      expect(result).toEqual(mockCat)
      expect(200)
    })
  })
})
