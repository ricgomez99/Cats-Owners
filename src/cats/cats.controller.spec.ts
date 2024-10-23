import { Test, TestingModule } from '@nestjs/testing'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'

const moduleMocker = new ModuleMocker(global)

describe('CatsController', () => {
  let catsController: CatsController
  let catsService: CatsService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2']
        if (token === CatsService) {
          return {
            findAll: jest.fn().mockReturnValue(results),
          }
        }

        if (typeof token === 'function') {
          const mockMetaData = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>

          const Mock = moduleMocker.generateFromMetadata(mockMetaData)
          return new Mock()
        }
      })
      .compile()

    catsService = moduleRef.get(CatsService)
    catsController = moduleRef.get(CatsController)
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test1', 'test2']
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result)

      expect(await catsController.findAll()).toBe(result)
    })
  })
})
