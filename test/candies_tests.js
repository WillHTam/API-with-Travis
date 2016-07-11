/* globals describe it before */
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:3000');
const app = require('../app');

describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  })
  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })
  it('should return all the records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.length(4)
      done()
    })
  })
})

describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  })
  it('should return an object that has a field called "name" and "color"', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('color')
      done()
    })
  })
})

describe('POST /candies', () => {
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'Lollipop',
      'color': 'Red',
    }).end(done)
  })

  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done);
  })

  it('should add a candy object to the collection and return it', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length - 1].name).to.equal('Lollipop')
      done()
    })
  })

  // it('should return a 422 response if the color field is wrong', (done) => {
  //   api.get('/candies')
  //   .set('Accept', 'application/json')
  //   .send({
  //     'id': 6,
  //     'name': 'Smartie',
  //     'color': 'Fat',
  //   })
  //   .end( (error, response) => {
  //     expect(422)
  //     expect(response.body.message).to.equal('Candy 6 not valid and not created.');
  //     done()
  //   })
  // })

}) // end POST

describe('PUT /candies/:id', () => {
  before((done) => {
    api.put('/candies/5')
    .set('Accept', 'application/json')
    .send({
      'id': 5,
      'name': 'Lollipop',
      'color': 'Black',
    }).end(done)
  })

  it('should return a 200 response', (done) => {
    api.get('/candies/:id')
    .set('Accept', 'application/json')
    .expect(200, done);
  })

  it('should update a candy', (done) => {
    api.get('/candies/')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body[response.body.length - 1].color).to.equal('Black')
      done()
    })
  })

}) // end PUT

// DELETE
describe('DELETE /candies/:id', () => {
  it('should delete a candy', (done) => {
    api.delete('/candies/5')
    .set('Accept', 'application/json')
    .end( (error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.message).to.equal('Candy 5 deleted')
      done()
    })
  })
}) // end DELETE

/*
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');
const port = process.env.PORT || 3000;
const api = supertest('http://localhost:' + port);

describe('GET /', () => {
  it('should return a 200 response', (done) => {
    api.get('/')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return Should return summary information about you: name, tagline etc', (done) => {
    api.get('/')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.summary.name).to.equal('Harris');
      expect(response.body.me.summary.age).to.equal(22);
      expect(response.body.me.summary.birthday).to.equal('June 30th 1993');

      done();
    });
  });
});

describe('GET /profile', () => {
  it('should return a 200 response', (done) => {
    api.get('/profile')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return profile statement', (done) => {
    api.get('/profile')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.profile.statement).to.equal('My name is Harris and I\'m a full-stack developer');
      done();
    });
  });
});

describe('GET /links', () => {
  it('should return a 200 response', (done) => {
    api.get('/links')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return a list of named links to your presence online', (done) => {
    api.get('/links')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.links).to.be.an('array');
      expect(response.body.me.links[0].github).to.equal('https://github.com/Harrislyg');
      expect(response.body.me.links[1].facebook).to.equal('https://www.facebook.com/harris.leow');
      expect(response.body.me.links[2].linkedin).to.equal('https://sg.linkedin.com/in/harrisleow');

      done();
    });
  });
});

describe('GET /projects', () => {
  it('should return a 200 response', (done) => {
    api.get('/projects')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return a summary list of the projects you have built GA', (done) => {
    api.get('/projects')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.projects).to.be.an('array');
      expect(response.body.me.projects[0]).to.have.property('tag');
      expect(response.body.me.projects[1]).to.have.property('name');
      expect(response.body.me.projects[2]).to.have.property('links');
      expect(response.body.me.projects[3]).to.have.property('description');
      expect(response.body.me.projects[4]).to.have.property('skills');

      done();
    });
  });
});

describe('GET /projects/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/projects/2')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return the full details of a specific projects: name, github & heroku links, images etc', (done) => {
    api.get('/projects/2')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.projects.tag).to.equal('SM');
      expect(response.body.me.projects.name).to.equal('Super-Mario');
      done();
    });
  });
});

describe('GET /skills', () => {
  it('should return a 200 response', (done) => {
    api.get('/skills')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('Should return a list of your skills/competencies each, a name and score 1-10', (done) => {
    api.get('/skills')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.skills).to.be.an('array');
      expect(response.body.me.skills[0]).to.have.property('name');
      expect(response.body.me.skills[0]).to.have.property('score');

      done();
    });
  });
});

describe('GET /education', () => {
  it('should return a 200 response', (done) => {
    api.get('/education')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should return a summary list of your education history', (done) => {
    api.get('/education')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.education).to.be.an('array');
      done();
    });
  });
});

describe('GET /education/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/education/2')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('Should return the full details of a specific education', (done) => {
    api.get('/education/2')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null');
      expect(response.body.me.education).to.have.property('school');
      expect(response.body.me.education).to.have.property('subjects');
      expect(response.body.me.education.school).to.equal('National University of Singapore');
      done();
    });
  });
});
*/
