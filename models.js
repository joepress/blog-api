
const mongoose = require('mongoose');


const blogPostSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required:true},
  author: {
    lastName: String,
    firstName: String,
    },
  created: {type: Date, required: false}
});


blogPostSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    title: this.title,
    content: this.content,
    author: this.author,
    created: this.created
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};