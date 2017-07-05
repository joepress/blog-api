const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create(
	'blogpost1','Lorem ipsum dolor sit amet, consectetur adipiscing elit.','John Ray','04/17/1995'
	);

BlogPosts.create(
	'blogpost2','Lorem ipsum dolor sit amet, consectetur adipiscing elit.','Billy Stump','04/17/1995'
	);

BlogPosts.create(
	'blogpost3','Lorem ipsum dolor sit amet, consectetur adipiscing elit.','Conway Strong','04/17/1995'
	);

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser,(req, res) =>{
	const requiredFields = ['title', 'content', 'author', 'publishDate'];
  	for (let i=0; i<requiredFields.length; i++) {
    	const field = requiredFields[i];
    	if (!(field in req.body)) {
      		const message = `Missing \`${field}\` in request body`
      		console.error(message);
      		return res.status(400).send(message);
        }
    }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(item);})


router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    console.log('here');
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blogposts's \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishdate: req.body.publishDate
  });
  res.status(204).end();
});


router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blogpost \`${req.params.ID}\``);
  res.status(204).end();
});


module.exports = router;