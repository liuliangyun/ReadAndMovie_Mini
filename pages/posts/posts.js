// pages/posts/posts.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   * call服务端请求数据并setData
   */
  onLoad: function (options) {
    console.log("onLoad");
    var post_contents = {
      date: "Oct 11 2019",
      title: "正是虾肥蟹壮时",
      img: {
        background: "/images/post/crab.png",
        avatar: "/images/avatar.png"
      },
      content: "菊黄蟹正肥，品尝秋之味。徐志摩把“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满”。",
      reading: "112",
      collection: "96"
    };
    this.setData(post_contents);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log("onShow");
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    console.log("onHide");
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    console.log("onUnload");
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    console.log("pull down");
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    console.log("reach bottom");
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    console.log("share");
  }
})