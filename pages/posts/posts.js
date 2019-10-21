// 只能用相对路径
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
  }
  
})