// 脚本文件只能用相对路径引入
var postsData = require('../../../data/posts-data.js')

Page({
  onLoad: function(option) {
    var postId = option.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData
    });
  }
})