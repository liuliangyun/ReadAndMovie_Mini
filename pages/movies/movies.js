var util = require("../../utils/util");
var app = getApp();
Page({

  data: {
    // 这里必须定义这三个空对象，因为getMovieListData为异步执行的方法
    // 不定义的话，有可能data里没有值，页面中使用数据绑定的地方会出错
    inTheaters: {},
    comingSoon: {},
    top250: {},

    searchResult: {},
    searchPanelShow: false,
    containerShow: true
  },

  onLoad: function() {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  onBindFocus: function() {
    this.setData({
      searchPanelShow: true,
      containerShow: false
    })
  },

  onBindBlur: function(event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, "searchResult", "");
  },

  onCancelImgTap: function() {
    this.setData({
      searchPanelShow: false,
      containerShow: true,
      searchResult: {}
    })
  },

  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
  },
  
  getMovieListData: function(url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        // 把header请求改成  header: { 'content-type': 'application/xml' }就可以了。额。。。明明获取的数据就是json，。。。可能是小程序后台对header做了限制。
        'Content-Type': 'application/xml'
      },
      success: (res) => {
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: (error) => {
      }
    })
  },

  processDoubanData: function(moviesDouban, settedKey, categoryTitle) {
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
    var tempData = {};
    tempData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(tempData);
  }

})