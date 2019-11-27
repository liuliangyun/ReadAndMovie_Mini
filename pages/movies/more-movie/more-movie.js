var util = require("../../../utils/util");
var app = getApp();
Page({

  data: {
    category: "",
    movies: {}
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
    util.http(dataUrl, this.processDoubanData);
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
    this.setData({ movies: movies });
  },

  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.category
    })
  }

})