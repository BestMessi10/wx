var caseBase =require("../../data/dataCase.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  toDetail:function(event){
    var caseId = event.currentTarget.dataset.caseid;
    
    var tittle = event.currentTarget.dataset.caseTittle;
    
    wx.navigateTo({
      url: 'cases-detail/cases-detail?id=' + caseId +'&tittle='+tittle
    })
    
  },
  toDetailt1: function (event) {
    console.log(event);
    var caseId = event.currentTarget.dataset.caseid;
    var navid = event.currentTarget.dataset.navid;    

    var tittle = event.currentTarget.dataset.caseTittle;

    wx.navigateTo({
      url: 'cases-detail/cases-detail?id=' + caseId + '&tittle=' + tittle+'&navid='+navid
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var caseItems = caseBase.caseItems;
    console.log(caseItems);
    this.setData({
      caseItems: caseItems
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})