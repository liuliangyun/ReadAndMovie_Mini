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
      url: "./post-detail/post-detail?id=" +postId
    })
  },

  // onSwiperItemTap: function (event) {
  //   var postId = event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: "./post-detail/post-detail?id=" + postId
  //   })
  // },

  onSwiperTap: function (event) {
    // target 指的是当前点击的组件；而 currentTarget 指的是事件捕获的组件
    // target 这里指的是image；而 currentTarget 这里指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "./post-detail/post-detail?id=" + postId
    })
  }
  
})