// 脚本文件只能用相对路径引入
var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({
  data: {
    isPlayingMusic: false,
    currentPostId: undefined,
    postData: {},
    collected: false
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

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      });
    }
    this.setMusicMonitor();   
  },

  setMusicMonitor: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });

    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    }); 
    
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    }); 
  },

  onCollectionTap: function(event) {
    this.getPostsCollectedSync();
    // this.getPostsCollectedASyn();
  },

  getPostsCollectedSync: function() {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postColected = postsCollected[this.data.currentPostId];
    // 收藏变成未收藏，未收藏变成收藏
    postColected = !postColected;
    postsCollected[this.data.currentPostId] = postColected;
    this.showToast(postsCollected, postColected);
    // this.showModal(postsCollected, postColected);
  },

  getPostsCollectedASyn: function() {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success(res) {
        var postsCollected = res.data;
        var postColected = postsCollected[that.data.currentPostId];
        // 收藏变成未收藏，未收藏变成收藏
        postColected = !postColected;
        postsCollected[that.data.currentPostId] = postColected;
        that.showToast(postsCollected, postColected);
        // that.showModal(postsCollected, postColected);
      }
    })
  },

  showModal: function (postsCollected, postColected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postColected ? '收藏该文章' : '取消收藏该文章',
      showCancel: true,
      cancelText: '取消',
      cancelColor: "#333",
      confirmText: '确定',
      confirmColor: "#405f80",
      success(res) {
        if(res.confirm) {
          that.showToast(postsCollected, postColected);
        }
      }
    })
  },

  showToast: function (postsCollected, postColected) {
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
  },

  onShareTap: function(event) {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        // res.tapIndex 表示用户点击了itemList的序号，从0开始
        wx.showModal({
          title: '分享',
          content: '微信小程序现在无法实现' + itemList[res.tapIndex],
          showCancel: false,
          confirmText: '我知道了',
          confirmColor: '#405f80'
        })
      }
    })
  },

  onMusicTap: function(event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    var postData = this.data.postData;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      });
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      });
    }
  }
})