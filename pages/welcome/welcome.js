// 实现用户交互：产生事件 捕捉事件 回调函数 处理事件
Page({
  onTap: function() {
    // 可以back，执行onHide
    // wx.navigateTo({
    //   url: "../posts/posts"
    // });
    // 不可以back，执行onUnload
    wx.redirectTo({
      url: "../posts/posts"
    });
  }
  
})