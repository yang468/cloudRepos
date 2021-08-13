/*
*所有的路由接口
*/
var user = require('./usermess');
var reg = require('./register');
var login = require('./login');
var blog = require('./blog');
var review = require('./review');
var message = require('./message');

module.exports = function (app) {

  app.get('/bloglist', blog.getAllBlog);  //跳到文章列表页

  app.get('/home', function (req, res) {  //跳到首页
    var user = req.session.user || null;
    res.render('index', {   //跳到index.html
      title: '博客——首页'
    });
  });

  app.get('/login', function (req, res) {  //调到登录页
    var user = req.session.user || null;
    res.render('login', {   //跳到login.html
      title: '博客——登录',
      error: ''
    });
  });

  app.post('/doLogin', login.checkLogin); //验证登录信息

  app.get('/register', function (req, res) {  //跳到注册页
    var user = req.session.user || null;
    res.render('register', {  //跳到register.html
      title: '博客——注册'
    });
  });

  app.post('/doRegister', reg.createUser);  //验证注册信息

  app.get('/writeBlog', function (req, res) {  //跳到写博客页面
    var user = req.session.user || null;
    message.totalUnreadMess(user._id).then(function (total) {
      res.render('writeblog', { //跳到writeblog.html
        title: '博客——写博客',
        user: user,
        totalmess: total
      });
    });
  });

  app.post('/submitBlog', blog.createBlog);  //提交博客信息

  app.get('/blog/:id/', blog.getBlog);  //获得某条博客信息

  app.get('/updateLike', blog.updateLike); //更新博客的喜欢数

  app.post('/submitReview', review.submitReview);  //提交博客的评论

  app.post('/submitReply', review.submitReply); //提交用户之间的回复

  app.get('/messlist', message.getAllMessage);  //获得所有的消息列表

  app.get('/usercenter', user.getUsermess);

  app.get('/account', function (req, res) {
    var user = req.session.user || null;
    message.totalUnreadMess(user._id).then(function (total) {
      res.render('account', {   //跳到account.html
        title: '博客——账户信息',
        user: user,
        totalmess: total
      });
    });
  });
  app.post('/delete', blog.deleteBlog);  //删除博客信息

  app.post('/updateBlog',blog.updateBlog);  //编辑博客内容

  app.get('/myblog/:id', user.getBlogByUser); //获得所有的博客信息

  app.post('/updateUsermess', user.updateUsermess); //更新用户信息
}
