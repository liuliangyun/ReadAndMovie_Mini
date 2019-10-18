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
    console.log("Posts data is load");
    var posts_content = [{
      date: "Oct 11 2019",
      title: "正是虾肥蟹壮时",
      background: "/images/post/crab.png",
      avatar: "/images/avatar.png",
      content: "菊黄蟹正肥，品尝秋之味。徐志摩把“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满”。",
      reading: "112",
      collection: "96"
    }, {
      date: "Oct 14 2019",
      title: "比利·林恩的中场故事",
      background: "/images/post/bl.png",
      avatar: "/images/avatar.png",
      content: "李安是一位绝不会重复自己的导演，本片将极富原创性李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。",
      reading: "62",
      collection: "92"
    }];
    // setData接收参数为JS对象，而这里posts_content只是一个数组，应写成{posts_content: posts_content}，或ES6简写为{posts_content}
    this.setData({posts_content});
  }
  
})