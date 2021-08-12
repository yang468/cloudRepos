var Blog = require('../models/blog');
var User = require('../models/user');
var Review = require('../models/review');
var message = require('./message');
var promise = require('promise');
var utils = require('../utils');

exports.createBlog = function (req, res) {
  var blogmess = {
    title: req.body.blogtitle,
    authorid: req.session.user._id,
    content: req.body.blogcontent,
    date: utils.getTimeNow(),
    tag: req.body.blogtag,
    //初值都置为0
    like_num: 0,
    review_num: 0,
    look_num: 0
  };
  var blog = new Blog(blogmess);
  //创建博客并保存
  blog.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      // res.redirect('/bloglist');
      res.send({ result:'ok' });
    }
  });
};


//获得所有博客信息
exports.getAllBlog = function (req, res) {
  var user = req.session.user || null;  //user不存在的时候为null
  Blog.find({}, function (err, bloglist) {
    if (err) {
      console.log(err);
    } else if (bloglist.length) {
      var userlist = [];
      for (let i = 0; i < bloglist.length; i++) {
        userlist.push(new Promise(function (resolve, reject) {
          User.findOne({ _id: bloglist[i].authorid }, function (err, user) {
            if (user) {
              resolve(user);  //如果找到则添加到userlist中
            } else {
              reject(null);
            }
          });
        }));
      }

      Promise.all(userlist).then(function (userlist) {
        message.totalUnreadMess(user._id).then(function (total) {
          res.send({
            title: '纯白博客',
            user: user,
            bloglist: bloglist,
            userlist: userlist,
            totalmess: total,
            error: ''
          });
        });
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      res.render('list', {
        title: '纯白博客',
        user: user,
        error: '暂无人拜访',
        totalmess: 0
      });
    }
  });
}

//获得某条博客的信息，并更新浏览次数
exports.getBlog = function (req, res) {
  var blogid = req.params.id;
  var error = '';
  var user = req.session.user || null;
  Blog.findOne({ _id: blogid }, function (err, blog) {
    if (blog === null) {
      error = '该文章被主人删除！';
      res.send({
        error: error  //如果blog为空，则返回error
      });
    } else {

      //否则更新文章阅读次数
      var promise1 = updateLook_num(blogid);
      //查找文章作者的信息
      var promise2 = findUser(blog.authorid);
      //查找该博客的所有评论信息
      var promise3 = findReview(blogid);
      //查看未读消息总数
      var promise4 = message.totalUnreadMess(blog.authorid);
      //使用promise.all来处理这四个异步操作

      Promise.all([promise1, promise2, promise3, promise4]).then(function (result) {
        res.send({
          title: blog.title,
          error: error,
          blog: blog,
          user: user,
          author: result[1],
          reviewlist: result[2],
          totalmess: result[3],
        });
      }).catch(function (err) {
        console.log(err);
      });
    }

  });
}

//更新喜欢的次数
exports.updateLike = function (req, res) {
  var blogid = req.query.blogid;
  Blog.update({ _id: blogid }, { $inc: { like_num: +1 } }, function (err, blog) {
    if (err) {
      res.send('error');
    } else {
      //向用户的消息列表里存入未查看消息
      Blog.findOne({ _id: blogid }, function (err, blog) {
        message.saveMessage(blog, '', '', 1, req.session.user)
          .then(function (ok) {
            res.send({ blog: blog }); //成功返回blog
          }).catch(function (err) {
            res.send({ error: 'error' });
          });
      });
    }
  });
};
//删除blog
exports.deleteBlog = function(req,res){
  var blogid = req.query.blogid;
  Blog.remove({ _id:blogid },function(err){
    if(err){
      res.send(err);
    } else{
      res.send({ result:'ok' });
    }
  })
}
//修改blog
exports.updateBlog = function(req,res){
  var blogid = req.query.blogid;
  var blogcontent = req.body.content;
  Blog.update({ _id:blogid },{$set:{content:blogcontent}},function(err){
    if(err){
      res.send(err);
    } else{
      res.send({ result:'ok' });
    }
  })
}
//更新浏览次数,需要return一个promise对象给前面的result数组使用
function updateLook_num(blogid) {
  return new Promise(function (resolve, reject) {
    Blog.update({ _id: blogid }, { $inc: { look_num: +1 } }, function (err, doc) {
      if (err) {
        reject('error');
      } else {
        resolve('ok');
      }
    });
  });
}
//查找文章作者
function findUser(authorid) {
  return new Promise(function (resolve, reject) {
    User.findOne({_id: authorid}, function(err,user){
      if(err){
        reject('error');
      } else{
        resolve(user);
      }
    })
  });
}
//查找评论信息

function findReview(blogid) {
  return new Promise(function (resolve, reject) {
    Review.findOne({ blogid: blogid }, function (err, reviews) {
      if (err) {
        reject('error');
      } else if (reviews) {
        resolve(reviews.reviewlist);
      } else {
        resolve(null);  //没有评论信息
      }
    });
  });
}
