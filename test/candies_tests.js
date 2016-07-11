/* globals describe it before*/
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');
const api = supertest('http://localhost:3000');
// above setting up the test and which port to use

// below an asynchronous version of Rspec
// by giving it the done argument, we tell it when the test is finished
describe ('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    });
  });
  it('should return all records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.length(4)
      done()
    })
  })
});

describe ('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/:id')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return an object that has a field called "name" and "color"', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('color')
      done()
    });
  });
})

describe ('POST /candies', () => {
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'Lollipop',
      'color': 'Pink'
    }).end(done);
  });

  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  });


  it('can return a 422 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 6,
      'name': 'Smartie',
      'color': 'Flannel'
    })
    .end( (error, response) => {
      expect(422);
      done()
    })
  });

  it('should add a candy object to the collection', done => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length-1].name).to.equal('Lollipop')
      done()
    });
  })

});

describe ('PUT /candies/:id', () => {
  before((done) => {
    api.put('/candies/5')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'Lollipop',
      'color': 'Magenta'
    }).end(done);
  });

  it('should return a 200 response', (done) => {
    api.get('/candies/:id')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('should add update the candy document', (done) => {
    api.get('/candies/')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length-1].color).to.equal('Magenta')
      done()
    });
  })
});

describe('DELETE /candies/:id', ()=> {
  it('should return undefined', (done)=> {
    api.delete('/candies/5/')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.message).to.have.equal('Candy 5 deleted')
      done()
    })
  })
})
