const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

 const should = chai.should();

 chai.use(chaiHttp);


 describe('Blog posts', function(){

 	before(function() {

   	 return runServer();

 	});

 	after(function() {

     return closeServer();

  	});

  	it('should list posts on GET', function(){
  	  return chai.request(app)
  	    .get('/blog-posts')
  		.then(function(res){
  		  res.should.have.status(200);
  	      res.should.be.json;
  		  res.should.be.a('object');

  	      res.body.length.should.be.above(0);

          const expectedKeys = ['title', 'content', 'author', 'publishDate'];
          res.body.forEach(function(item) {
         	item.should.be.a('object');
          	item.should.include.keys(expectedKeys);
        	});

  		});

  	});


  	it('should add a blog-post on POST', function(){

  	  const newPost = { 
  	    title: 'blogpost4',
  	    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  	    author: 'Terry Ray',
  	    publishDate: '05/4/1985'
  	  }
  	  return chai.request(app)
  	    .post('/blog-posts')
  	    .send(newPost)

  	    .then(function(res){
  	  	  res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys('title', 'content', 'author', 'publishDate');
          res.body.id.should.not.be.null;

          res.body.should.deep.equal(Object.assign(newPost, {id: res.body.id}));
  	    });

    });


  	it('should update an item on PUT', function(){
      const updatePost = { 
  	    title: 'blogpost5',
  	    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  	    author: 'Jerry Roy',
  	    publishDate: '09/15/1993'
  	  };
      return chai.request(app)
        .get('/blog-posts')
        .then(function(res){ 
          updatePost.id = res.body[0].id;

          return chai.request(app)
            .put(`/blog-posts/${updatePost.id}`)
            .send(updatePost);
        })
       return chai.request(app)
      	.then(function(res) {
          res.should.have.status(204);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.deep.equal(updatePost);
        });
    });


  	it('should delete a post on DELETE', function(){
  	  return chai.request(app)
  	    .get('/blog-posts')
  	    .then(function(res){
  	      return chai.request(app)
  	        .delete(`/blog-posts/${res.body[0].id}`);
  	    })
  	    .then(function(res){
  	      res.should.have.status(204);
  	    });
  	});

});


 