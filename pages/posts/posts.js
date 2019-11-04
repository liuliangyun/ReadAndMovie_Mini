// 脚本文件只能用相对路径引入
var postsData = require('../../data/posts-data.js')

// pages/posts/posts.js
Page({
  data: {
  },

  onLoad: function (options) {
    this.setData({ 
      posts_key: postsData.postList 
    });
    console.log("Posts data is load");
  },

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "./post-detail/post-detail"
    })
    console.log("onPostTap");
  }
  
})