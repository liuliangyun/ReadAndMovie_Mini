var util = require("../../../utils/util");
var app = getApp();
Page({

  data: {
    category: "",
    movies: [],
    requestUrl: "",
    totalCount: 0,
    isEmpty:true
  },

  onLoad: function(option) {
    var category = option.category;
    this.setData({ category: category });

    var dataUrl = "";
    switch(category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.setData({ requestUrl: dataUrl });
    util.http(dataUrl, this.processDoubanData);
  },

  onScrollToLower: function() {
    console.log("加载更多");
    var requestUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(requestUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh: function() {
    console.log("下拉刷新");
    this.setData({ movies: [], isEmpty: true, totalCount: 0 });
    var requestUrl = this.data.requestUrl + "?start=0&count=20";
    util.http(requestUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function(moviesDouban) {
    var movies = [];
    for(var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var movie = {
        title: title,
        stars: util.convertStarsNumberToArray(subject.rating.stars),
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        moviesId: subject.id
      }
      movies.push(movie);
    }
    // 这里直接使用this，无需使用that，因为这里的上下文环境中可以得知this就是success回调中用来指代this的that
    var totalCount = this.data.totalCount + 20;
    var totalMovies = [];
    if(!this.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.setData({ isEmpty: false })
    }
    this.setData({ 
      totalCount: totalCount,
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();
  },

  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.category
    })
  }

})