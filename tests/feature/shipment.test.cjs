const request = require('supertest');

let app;

beforeAll(async () => {
    const mod = await import('../../dist/app.js');
    app = mod.default;
});

describe('Shipment Test', () => {

    afterEach(async () => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        jest.setTimeout(200000);
    });

    test('500: should fail to create shipment for invalid payload', async () => {
        const body = {
            origin: "victoria island",
            destination: "lekki"
        };

        const response = await request(app)
            .post('/api/shipments')
            .send(body);
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error creating shipment');
    });

    test('should create shipment successfully with valid payload', async () => {
        const body = {
            senderName: "benjamin",
            receiverName: "tola",
            origin: "victoria island",
            destination: "lekki"
        };

        const response = await request(app)
            .post('/api/shipments')
            .send(body);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Shipment created successfully');
    });

});