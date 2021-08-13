var User = require('../models/user');

exports.createUser = function (req, res) {
  var usermess = {
    name: req.body.username,
    password: req.body.userpass,
    icon: '12.png',
    sex: req.body.sex,
    tel: '',
    qq: '',
    weixin: '',
    weibo: '',
    email: req.body.useremail
  };
  var user = new User(usermess);
  user.save(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: 'ok' });
    }
  });
};
