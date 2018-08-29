//获取应用实例
const app = getApp()
// pages/booking/booking.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{
      name:'',
      phone:'',
      company:'',
      address:''
    },
    error:''
  },
  onClickPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '028-85962462',
      success: function () {
        console.log("成功拨打电话");
      }
    })
  },
  onClickLocation:function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  bookFormSubmit:function(e){
    var book= this.data.book;
    //book对象
    var name=book.name;
    var phone = book.phone;
    var company= book.company;
    var address = book.address;
    //开关，错误提示
    
    var error = '';
    
    if(name<2){
      error = '姓名不能少于两个字符'  
      this.setData({
        error:error
      });
    } else if (!(/^1[347589]\d{9}$/.test(phone))){
      error = '手机号码格式不正确!';  
      this.setData({
        error: error
      });
    }else if(name==''&& phone==''){
        error = '名称或手机不能为空';
        this.setData({
          error: error
        });
    }else{
      this.setData({
        error: ''
      });
      wx.request({
        url: 'https://api.wboyuan.com/book/wxSendBook',
        method:'POST',
        data:{
          name:name,
          phone:phone,
          company:company,
          address:address
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        success:function(res){    
          if(res.data.status){
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            });
          }else{
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 2000
            })
          }      
          
          
        }

      })

    }


  },
  bindName:function(e){    
      this.setData({
        'book.name':e.detail.value
      })
  },
  bindPhone:function(e){
    this.setData({
      'book.phone': e.detail.value
    })
  },
  bindCompany: function (e) {
    this.setData({
      'book.company': e.detail.value
    })
  },
  bindAddress: function (e) {
    this.setData({
      'book.address': e.detail.value
    })
  },

  onClickQQ:function(){

  },
  mapbtn: function (e) {
    
    wx.navigateTo({
      url: "../shopCart/shopCart"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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