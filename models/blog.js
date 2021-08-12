var mongoose = require('mongoose');
var Blog = require('../schemas/blog');
//创建集合名为Blogs的model
module.exports = mongoose.model('Blog', Blog);
