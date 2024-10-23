import { Test, TestingModule } from '@nestjs/testing'
import { CatsService } from './cats.service'
import { Model, Query } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { CatTest } from './interfaces/cat.test.interface'
import { createMock } from '@golevelup/ts-jest'

const catMock = (
  id = '123',
  name = 'nina',
  age = 4,
  breed = 'persian',
): CatTest => ({
  id,
  name,
  age,
  breed,
})

const catDocMock = (mock?: Partial<CatTest>): Partial<CatTest> => ({
  id: mock?.id ?? '123',
  name: mock?.name ?? 'nina',
  age: mock?.age ?? 4,
  breed: mock?.breed ?? 'persian',
})

const catsArray: Partial<CatTest>[] = [
  catMock(),
  catMock('456', 'James', 2, 'Mombay'),
  catMock('789', 'Thomas', 12, 'siamese'),
]

const catsDocArray: Partial<CatTest>[] = [
  catDocMock(),
  catDocMock({ id: '456', name: 'James', age: 2, breed: 'Mombay' }),
  catDocMock({ id: '789', name: 'Thomas', age: 12, breed: 'siamese' }),
]

const serviceMock = {
  new: jest.fn().mockResolvedValue(catMock()),
  constructor: jest.fn().mockResolvedValue(catMock()),
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  exec: jest.fn(),
}

describe('CatsService', () => {
  let service: CatsService
  let model: Model<CatTest>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken('Cat'),
          useValue: serviceMock,
        },
      ],
    }).compile()

    service = module.get<CatsService>(CatsService)
    model = module.get<Model<CatTest>>(getModelToken('Cat'))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('findAll', () => {
    it('should return a list of cats', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(catsDocArray),
      } as unknown as Query<CatTest[], CatTest>)
      const cats = await service.findAll()

      expect(cats).toEqual(catsArray)
    })
  })

  describe('findOne', () => {
    it('should return a cat by its id', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce(
        createMock<Query<CatTest, CatTest>>({
          exec: jest
            .fn()
            .mockResolvedValueOnce(catDocMock({ id: '123', name: 'nina' })),
        }),
      )
      const mock = catDocMock()
      const cat = await service.findOne('123')
      expect(cat).toEqual(mock)
    })
  })
})
