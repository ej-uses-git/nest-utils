import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';

import { TranslateExceptions } from '../translate-exceptions.filter';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn(),
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('System header validation service', () => {
  let service: TranslateExceptions;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateExceptions],
    }).compile();
    service = module.get<TranslateExceptions>(TranslateExceptions);
  });

  describe('All exception filter tests', () => {
    it('TranslateExceptions is defined', () => {
      expect(service).toBeDefined();
    });

    it('Exception is translated', () => {
      service.catch(
        new HttpException('Http exception', HttpStatus.NOT_FOUND),
        mockArgumentsHost,
      );
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        statusCode: 404,
        message: 'אינו נמצא',
      });
    });
  });
});
