var mongoose = require('mongoose');
var Review = require('../schemas/review');
//创建集合名为Reviews的model
module.exports = mongoose.model('Review', Review);
