import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

import { ItemApi } from '../item.api';
import { ItemController } from '../../../../domain/controllers/item.controller';
import { ITEM_CONTROLLER } from '../../../../domain/symbols/item.symbols';

describe('ItemApi', () => {
  let itemApi: ItemApi;
  let itemController: ItemController;
  let app: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemApi],
      providers: [
        {
          provide: ITEM_CONTROLLER,
          useValue: {
            getItemBySnack: jest.fn(),
            getItemByFollowUp: jest.fn(),
            getItemByDrink: jest.fn(),
            getItemByDessert: jest.fn(),
            findById: jest.fn(),
            createItem: jest.fn(),
            updateItem: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    itemApi = module.get<ItemApi>(ItemApi);
    itemController = module.get<ItemController>(ITEM_CONTROLLER);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getItemBySnack', () => {
    it('should return 200 with items when successful', async () => {
      const mockItem = [
        {
          id: 1,
          name: 'Cachorro quente',
          price: 9,
          description: 'Cachorro quente de 15cm',
          category_id: 1,
        },
      ];
      (itemController.getItemBySnack as jest.Mock).mockResolvedValue(mockItem);

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemBySnack',
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when no items are found', async () => {
      (itemController.getItemBySnack as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemBySnack',
      );

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 on error', async () => {
      const errorMessage = 'An error occurred';
      (itemController.getItemBySnack as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemBySnack',
      );

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('getItemByFollowUp', () => {
    it('should return 200 with items when successful', async () => {
      const mockItem = [
        {
          id: 1,
          name: 'Cachorro quente',
          price: 9,
          description: 'Cachorro quente de 15cm',
          category_id: 2,
        },
      ];
      (itemController.getItemByFollowUp as jest.Mock).mockResolvedValue([
        {
          id: 1,
          name: 'Cachorro quente',
          price: 9,
          description: 'Cachorro quente de 15cm',
          category_id: 2,
        },
      ]);

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByFollowUp',
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when no items are found', async () => {
      (itemController.getItemByFollowUp as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByFollowUp',
      );

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 on error', async () => {
      const errorMessage = 'An error occurred';
      (itemController.getItemByFollowUp as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByFollowUp',
      );

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('getItemByDrink', () => {
    it('should return 200 with items when successful', async () => {
      const mockItem = [
        {
          id: 1,
          name: 'Cachorro quente',
          price: 9,
          description: 'Cachorro quente de 15cm',
          category_id: 3,
        },
      ];
      (itemController.getItemByDrink as jest.Mock).mockResolvedValue(mockItem);

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByDrink',
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when no items are found', async () => {
      (itemController.getItemByDrink as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByDrink',
      );

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 on error', async () => {
      const errorMessage = 'An error occurred';
      (itemController.getItemByDrink as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByDrink',
      );

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('getItemByDessert', () => {
    it('should return 200 with items when successful', async () => {
      const mockItem = [
        {
          id: 1,
          name: 'Cachorro quente',
          price: 9,
          description: 'Cachorro quente de 15cm',
          category_id: 4,
        },
      ];
      (itemController.getItemByDessert as jest.Mock).mockResolvedValue(
        mockItem,
      );

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByDessert',
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when no items are found', async () => {
      (itemController.getItemByDessert as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByDessert',
      );

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 on error', async () => {
      const errorMessage = 'An error occurred';
      (itemController.getItemByDessert as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer()).get(
        '/item/getItemByDessert',
      );

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('findById', () => {
    it('should return 200 with item when item is found', async () => {
      const mockItem = {
        id: 1,
        name: 'Cachorro quente',
        price: 9,
        description: 'Cachorro quente de 15cm',
        category_id: 2,
      };

      (itemController.findById as jest.Mock).mockResolvedValue(mockItem);

      const response = await supertest(app.getHttpServer()).get('/item/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when item is not found', async () => {
      (itemController.findById as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer()).get('/item/1');

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 when an error occurs', async () => {
      const errorMessage = 'Internal Server Error';
      (itemController.findById as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer()).get('/item/1');

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('createItem', () => {
    it('should return 200 with created item when successful', async () => {
      const mockItem = {
        id: 1,
        name: 'Cachorro quente',
        price: 9,
        description: 'Cachorro quente de 15cm',
        category_id: 2,
      };

      (itemController.createItem as jest.Mock).mockResolvedValue(mockItem);

      const response = await supertest(app.getHttpServer()).post('/item').send({
        name: 'Cachorro quente',
        price: 9,
        description: 'Cachorro quente de 15cm',
        category_id: 2,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when createItem returns null', async () => {
      (itemController.createItem as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer()).post('/item').send({
        name: 'Cachorro quente',
        price: 9,
        description: 'Cachorro quente de 15cm',
        category_id: 2,
      });

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 when an error occurs', async () => {
      const errorMessage = 'Internal Server Error';
      (itemController.createItem as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer()).post('/item').send({
        name: 'Cachorro quente',
        price: 9,
        description: 'Cachorro quente de 15cm',
        category_id: 2,
      });

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('updateItem', () => {
    it('should return 200 with updated item when successful', async () => {
      const mockItem = {
        id: 1,
        name: 'Cachorro quente atualizado',
        price: 10,
        description: 'Cachorro quente de 15cm atualizado',
        category_id: 2,
      };

      (itemController.updateItem as jest.Mock).mockResolvedValue(mockItem);

      const response = await supertest(app.getHttpServer())
        .put('/item/1')
        .send({
          name: 'Cachorro quente atualizado',
          price: 10,
          description: 'Cachorro quente de 15cm atualizado',
          category_id: 2,
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when updateItem returns null', async () => {
      (itemController.updateItem as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer())
        .put('/item/1')
        .send({
          name: 'Cachorro quente atualizado',
          price: 10,
          description: 'Cachorro quente de 15cm atualizado',
          category_id: 2,
        });

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 when an error occurs', async () => {
      const errorMessage = 'Internal Server Error';
      (itemController.updateItem as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer())
        .put('/item/1')
        .send({
          name: 'Cachorro quente atualizado',
          price: 10,
          description: 'Cachorro quente de 15cm atualizado',
          category_id: 2,
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('findAll', () => {
    it('should return 200 with items when successful', async () => {
      const mockItem = [
        {
          id: 1,
          name: 'Cachorro quente',
          price: 9,
          description: 'Cachorro quente de 15cm',
          category_id: 1,
        },
      ];
      (itemController.findAll as jest.Mock).mockResolvedValue(mockItem);

      const response = await supertest(app.getHttpServer()).get('/item');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ item: mockItem });
    });

    it('should return 404 when no items are found', async () => {
      (itemController.findAll as jest.Mock).mockResolvedValue(null);

      const response = await supertest(app.getHttpServer()).get('/item');

      expect(response.status).toBe(404);
      expect(response.text).toBe('Items not found');
    });

    it('should return 500 on error', async () => {
      const errorMessage = 'An error occurred';
      (itemController.findAll as jest.Mock).mockRejectedValue(
        new Error(errorMessage),
      );

      const response = await supertest(app.getHttpServer()).get('/item');

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });
});
