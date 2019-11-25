var app = getApp();
Page({

  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
  },

  onLoad: function() {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250";

    this.getMovieListData(inTheatersUrl);
    this.getMovieListData(comingSoonUrl);
    this.getMovieListData(top250Url);
  },
  
  getMovieListData: function(url) {
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        // 把header请求改成  header: { 'content-type': 'application/xml' }就可以了。额。。。明明获取的数据就是json，。。。可能是小程序后台对header做了限制。
        'Content-Type': 'application/xml'
      },
      success: (res) => {
        console.log("success");
        console.log(res);
      },
      fail: (error) => {
        console.log("failed");
        console.log(error);
      }
    })
  }

})