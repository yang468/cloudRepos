var User = require('../models/user');

exports.createUser = function (req, res) {
  var usermess = {
    name: req.body.username,
    password: req.body.userpass,
    icon: '12.png',
    sex: '',
    tel: '',
    qq: '',
    weixin: '',
    weibo: '',
    email: req.body.useremail
  };
  var user = new User(usermess);

  // 创建一个邮件对象
  // var mail = {
  //   // 发件人
  //   from: '小静博客 <luwenjing_apple@126.com>',
  //   // 主题
  //   subject: '激活账号',
  //   // 收件人
  //   to: usermess.email,
  //   // 邮件内容，HTML格式
  //   text: '点击激活：<a href="http://localhost:3000/checkCode?name=' + usermess.name + '&code=123456"></a>'
  // };
  user.save(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send({ result: 'ok' });
    }
  });
};
