App({

  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    // 直接使用豆瓣api会报403错误，解决方法是使用代理，将豆瓣API地址换成 https://douban.uieee.com
    doubanBase: "https://douban.uieee.com"
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
