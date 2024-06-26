import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/singin should return an user with status code 200', async () => {
    const req = await request(app.getHttpServer()).post('/auth/signin').send({
      "email": "usuario212@mail.com",
      "password":"Alexa_2528."
    })
    console.log(req.body);
    token = req.body.token
    expect(req.status).toBe(200);
  })


  it('/GET/users/:id should return an error with status code 400 uuid ', async () => {
    const req = await request(app.getHttpServer()).get('/users/2312').set('Authorization', `Bearer ${token}`);

    console.log(req.body);
    

    expect(req.status).toBe(400);
    expect(req.body.message).toBe('Validation failed (uuid is expected)')
  });

  it('/GET/users/:id should return an Object of products with status code 200', async () => {
    const req = await request(app.getHttpServer()).get('/users/a35b1d41-4ba6-4092-a870-97b12de3f0b6').set('Authorization', `Bearer ${token}`);
    console.log(req.body);


    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('/GET/users should return an array of users with status code 200', async () => {
    const req = await request(app.getHttpServer()).get('/users').set('Authorization', `Bearer ${token}`);
    console.log(req.body);  
  
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('/GET/products should return an array of products with status code 200', async () => {
    const req = await request(app.getHttpServer()).get('/products');
    console.log(req.body);  
  
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('/GET/orders should return an array of orders with status code 200', async () => {
    const req = await request(app.getHttpServer()).get('/orders');
    console.log(req.body);  
  
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  // it('/Post/categories should return an array of categories with status code 201', async () => {
  //   const req = await request(app.getHttpServer()).post('/categories');
  //   console.log(req.body);

  //   expect(req.status).toBe(201);
  //   expect(req.body).toBeInstanceOf(Array);
  
  // })

  // it('/Get/users/:id should return an bad request with status code 400', async () => {
  //   const req = await request(app.getHttpServer()).get('/users/123');
  //   console.log(req.body);
  //   expect(req.status).toBe(404);
  //   expect(req.body.message).toBe('Users not found !')
  // })

  it('/Get/products/:id should return an bad request with status code 400', async () => {
    const req = await request(app.getHttpServer()).get('/products/123');
    console.log(req.body);
    expect(req.status).toBe(400);
    expect(req.body.message).toBe('Validation failed (uuid is expected)')
    expect(req.body.error).toBe('Bad Request')
  })






});
