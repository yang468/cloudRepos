var mongoose = require('mongoose');
var Message = require('../schemas/message');
//创建集合名为Messages的model
module.exports = mongoose.model('Message', Message);
