import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../../../src/controllers/health.controller';
import { HealthService } from '../../../src/services/health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let healthService: jest.Mocked<HealthService>;

  const mockHealthService = {
    getStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: mockHealthService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthService = module.get(HealthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should return status and timestamp from HealthService', () => {
      const mockResult = {
        status: 'Service is running',
        timestamp: '2026-01-01T00:00:00.000Z',
      };
      mockHealthService.getStatus.mockReturnValue(mockResult);

      const result = controller.checkHealth();

      expect(result).toEqual(mockResult);
      expect(healthService.getStatus).toHaveBeenCalledTimes(1);
    });
  });
});
