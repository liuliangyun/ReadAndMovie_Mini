var util = require("../../../utils/util");
var app = getApp();
Page({

  data:{
    currentMovieId: undefined,
  },

  onLoad: function(option) {
    var movieId = option.id;
    this.setData({
      currentMovieId: movieId
    });

    var requestUrl = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(requestUrl, this.processMovieDetail);
  },

  processMovieDetail: function(movieDetail) {
    if(!movieDetail) {
      return;
    }
    // 判空的规律是：如果属性直接在movieDetail下，就暂时不考虑movieDetail是空的情况；如果是二级属性，我们才进行判空处理
    var director = {
      avatar: "",
      name: "",
      id: ""
    };
    if(movieDetail.directors[0] !== null) {
      if(movieDetail.directors[0].avatars !== null) {
        director.avatar = movieDetail.directors[0].avatars.large;
      }
      director.name = movieDetail.directors[0].name;
      director.id = movieDetail.directors[0].id;
    }
    var movie = {
      movieImg: movieDetail.images ? movieDetail.images.large : "",
      country: movieDetail.countries[0],
      title: movieDetail.title,
      originalTitle: movieDetail.original_title,
      wishCount: movieDetail.wish_count,
      commentCount: movieDetail.comments_count,
      year: movieDetail.year,
      generes: movieDetail.genres.join("、"),
      stars: util.convertStarsNumberToArray(movieDetail.rating.stars),
      score: movieDetail.rating.average,
      director: director,
      casts: util.convertToCastString(movieDetail.casts),
      castsInfo: util.convertToCastInfo(movieDetail.casts),
      summary: movieDetail.summary
    };
    this.setData({
      movie: movie
    });
  },

  // 查看图片
  viewMoviePostImg: function(event) {
    var url = event.currentTarget.dataset.src;
    wx.previewImage({
      current: url,  // 当前显示图片的http链接
      urls: [url]  // 需要预览的图片http链接列表
    });
  }
})