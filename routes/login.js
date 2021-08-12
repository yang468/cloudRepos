var User = require('../models/user');
//检查用户登录情况
exports.checkLogin = function (req, res) {
  var username = req.body.username;
  var userpass = req.body.userpass;

  User.findOne({ name: username }, function (err, user) {
    if (user == null) {
      User.findOne({ email: username }, function (err, user) {  //检查是否能通过email找到用户
        if (user === null) {
          res.render('login', {
            title: '登录',
            error: '用户名不存在！'
          });
        } else {
          if (user.password !== userpass) {
            res.render('login', {
              title: '登录',
              error: '密码错误！'
            });
          } else {
            req.session.user = user;
            // res.redirect('/bloglist');
            res.send({ 'result': 'ok' });
          }
        }
      });
    } else {
      if (user.password != userpass) {
        res.render('login', {
          title: '登录',
          error: '密码错误！'
        });
      } else {
        req.session.user = user;
        // res.redirect('/bloglist');
        res.send({ 'result': 'ok' });
      }
    }
  });
};
