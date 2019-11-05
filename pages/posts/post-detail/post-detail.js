// 脚本文件只能用相对路径引入
var postsData = require('../../../data/posts-data.js')

Page({
  data: {
    
  },
  onLoad: function(option) {
    var postId = option.id;
    this.setData({
      currentPostId: postId
    });

    var postData = postsData.postList[postId];
    this.setData({
      postData
    });

    var postsCollected = wx.getStorageSync("posts_collected");
    if(postsCollected) {
      var postCollected = postsCollected[postId];
      if(postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
  },

  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postColected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postColected = !postColected;
    postsCollected[this.data.currentPostId] = postColected;
    // 更新文章是否收藏的缓存
    wx.setStorageSync("posts_collected", postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postColected
    });

    wx.showToast({
      title: postColected ? '收藏成功' : '取消成功',
      duration: 1000,
      icon: "success"
    })
  }
})