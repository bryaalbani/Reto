const server = require('./app.js')
const supertest = require('supertest')
const requestWithSupertest = supertest(server);

describe('Devops Endpoint', () => {
    it('GET /DevOps should error by wrong http verb', async () => {
        const res = await requestWithSupertest.get('/DevOps');
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty("error");
    })

    it('POST /DevOps should error by not token, unauthorized', async () => {
        const res = await requestWithSupertest.post('/DevOps');
        expect(res.status).toEqual(401);
        expect(res.body).toHaveProperty("error");
    })

    it('POST /DevOps should error by not body, wrong request', async () => {
        const res = await requestWithSupertest.post('/DevOps')
            .set('x-jwt-kwy', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4gTm95IiwiaWQiOjEwLCJ1cmwiOiIvRGV2T3BzIn0.oviiu0b_Z5Si0nLDHKh5MgNC9Dt9UEi4Q2GE1p5Pb1Y");
        expect(res.status).toEqual(400);
        expect(res.body).toHaveProperty("error");
    })

    it('POST /DevOps should be success', async () => {
        const res = await requestWithSupertest.post('/DevOps')
            .set('x-jwt-kwy', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4gTm95IiwiaWQiOjEwLCJ1cmwiOiIvRGV2T3BzIn0.oviiu0b_Z5Si0nLDHKh5MgNC9Dt9UEi4Q2GE1p5Pb1Y")
            .send({
                to: "Juan",
                from: "Juan2",
                message: "some message"
            })
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty("message");
    })
})