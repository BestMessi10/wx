var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    scale: 18,
    markers:[
    ],
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
   
    //获取跳转后的参数
    if (options.latitude != undefined && options.longitude!=undefined){
       that.setData({
         latitude: options.latitude,
         longitude: options.longitude 
       })
      //默认调用地图
      common('公交站', that.data.latitude, that.data.longitude, '/image/gjc.png', that)
    }else{
      wx.showToast({
        title: '获取地址失败',
        icon: 'none',
        duration: 3000
      })
    }
   
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    //this.mapCtx = wx.createMapContext('map')
  },
  mapchange:function(e){
    var that=this
   // that.mapCtx.moveToLocation()
    var num = e.currentTarget.dataset.id;
    if(num!=null||num!=''){
       that.setData({
         num:num
       })
      //判断点击的按钮
      if(num==0){
        common('地铁站', that.data.latitude, that.data.longitude, '/image/dt.png', that)
      }
      if (num == 1) {
        common('公交站', that.data.latitude, that.data.longitude, '/image/gjc.png', that)
      }
      if (num == 2) {
        common('休闲', that.data.latitude, that.data.longitude, '/image/xx.png', that)
      }
      if (num == 3) {
        common('购物', that.data.latitude, that.data.longitude, '/image/gw.png', that)
      }
      if (num == 4) {
        common('美食', that.data.latitude, that.data.longitude, '/image/ms.png', that)
      }
      if (num == 5) {
        common('医院', that.data.latitude, that.data.longitude, '/image/yy.png', that)
      }
      if (num == 6) {
        common('银行', that.data.latitude, that.data.longitude, '/image/yh.png', that)
      }
    
    }
  },
  //地图图标点击事件
  bindmarkertap:function(e){
    var that=this;
    if (e.markerId != "" || e.markerId !=null){
      var data = that.data.markers;
      for(var i=0;i<data.length;i++){

        if (e.markerId == data[i].id){
          data[i].callout.display ='ALWAYS';
        }
      }
    }else{
      wx.showToast({
        title: '获取名称失败',
        icon: 'none',
        duration: 3000
      })
    }
  },
  //地图点击事件
  bindtap: function(e){
    var that=this;
    var data = that.data.markers;
    if(data.length>0){

      for (var i = 0; i < data.length; i++) {
          data[i].callout.display = 'BYCLICK';
      }
    }
  }
})

//地图调用公共方法
var common = function (key, latitude, longitude, img, that){
  // 实例化API核心类
  var demo = new QQMapWX({
    key: 'FFTBZ-PAPRG-FKYQT-ICVVS-QPDG5-ACFCG', // 必填
  });
  // 调用接口
  demo.search({
    keyword: key,
    location: {
      latitude: latitude,
      longitude: longitude
    },
    page_size:20,
    region_fix: 1,
    success: function (res) {
    
      if (res.status == 0) {

        var data = res.data;
        //声明数组
        var maplist = [];
        for (var i = 0; i < res.data.length; i++) {
          var map = {};
          var callout={};
          map.id = i;
          map.latitude = data[i].location.lat;
          map.longitude = data[i].location.lng;
          map.iconPath = img;
          map.width = 20;
          map.height = 20;
          //添加图标
          callout.content = data[i].title;
          callout.color = "#000000";
          callout.padding = 8;
          callout.display ='BYCLICK';
          callout.textAlign = 'center';
          callout.bgColor = '#ffffff';
          callout.borderRadius='6';
          map.callout = callout;
          maplist.push(map);
        }
        //添加当前位置
        var map1 = {};
        var callout1 = {};
        map1.id = 99;
        map1.latitude = latitude;
        map1.longitude = longitude;
        map1.iconPath = '/image/my_map.png';
        map1.width = 20;
        map1.height = 20;
        //添加图标
        callout1.color = "#000000";
        callout1.padding = 8;
        callout1.display = 'BYCLICK';
        callout1.textAlign = 'center';
        callout1.bgColor = '#ffffff';
        callout1.borderRadius = '6';
        map1.callout = callout1;
        maplist.push(map1);

        that.setData({
          markers: maplist
        })
      }
    },
    fail: function (res) {
    
    },
    complete: function (res) {
   
    }
  });
}