# 博客API
功能：博客的增删改查，用户的登录注册，博客的列表、详情、评论

## 使用方法

需要添加自己的views文件，在pages中包含index、login、register、account等文件用于接受返回的数据

## 所有的路由接口

```txt
1. '/bloglist' :文章列表显示
2. '/home' :回到首页
3. '/login' :跳到登录页面
4. '/doLogin' :验证登录信息
5. '/register' :跳到注册页
6. '/doRegist' :验证注册信息
7. '/writeBlog' :跳到写博客界面
8. '/submitBlog' :提交博客信息
9. '/blog/:id/' :获取某条博客信息
10. '/updateLike' :更新博客喜欢数
11. '/submitReview' :提交评论
12. '/submitReply' :提交用户间的回复
13. '/messlist' :获得所有的消息列表
14. '/delete' :删除某条博客
15.  '/updateBlog' :编辑修改博客信息
16. '/myblog/:id/' :获取所有博客信息
17. '/updateUsermess' :更新用户信息
```



