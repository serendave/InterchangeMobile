import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ItemsModule } from '../../src/items/items.module';
import { ItemsService } from '../../src/items/items.service';

describe('Items', () => {
  let app: INestApplication;
  let itemsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ItemsModule],
    })
      .overrideProvider(ItemsService)
      .useValue(itemsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET items`, () => {
    return request(app.getHttpServer()).get('/items').expect(200).expect({
      data: itemsService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
