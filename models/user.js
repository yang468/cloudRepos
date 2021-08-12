var mongoose = require('mongoose');
var User = require('../schemas/user');
//创建集合名为Users的model
module.exports = mongoose.model('User', User);
