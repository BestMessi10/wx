var cityData = require('../../utils/city.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    totop: 1,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //////
    houseinfo: '',
    imgonload:'',
    //分页
    pagesize:'10',
    pageNum:1,
    hasMoreData: true,
    contentlist: [],
    ////
    // 下拉菜单
    first: '区域',
    second: '租金',
    thirds: '排序',
    fours: '筛选',
    _num: 0,
    _res: 0,
    // 筛选
    array: [{
      name: '单拍',
      isSelected: false
    }, {
      name: '亲子套餐',
      isSelected: false
    }, {
      name: '活动套餐',
      isSelected: false
    }, {
      name: '女王套餐',
      isSelected: false
    }],
    zhuangxiu: [{
      name: '≤40㎡',
      id: "1"
    }, {
      name: '40-60㎡',
      id: "2"
    }, {
      name: '60-80㎡',
      id: "3"
    }, {
      name: '80-100㎡',
      id: "4"
    }, {
      name: '100-120㎡',
      id: "5"
    }, {
      name: '≥100㎡',
      id: "6"
    }],
    louceng: [{
      name: '一居',
      id: "1"
    }, {
      name: '二居',
      id: "2"
    }, {
      name: '三居',
      id: "3"
    }, {
      name: '四居',
      id: "4"
    }],

    leibei: [{
      name: '独卫',
      id: "1"
    }, {
      name: '近地铁',
      id: "2"
    }, {
      name: '精装',
      id: "3"
    }, {
      name: '独立阳台',
      id: "4"
    }, {
      name: '免中介费',
      id: "5"
    }, {
      name: '押一付一',
      id: "6"
    }, {
      name: '双卫',
      id: "7"
    }, {
      name: '新上',
      id: "8"
    },{
      name: '随时看房',
      id: "9"
    }, {
      name: '0元住',
      id: "10"
    }],
    tese: [{
      name: '无电梯',
      id: "0"
    }, {
      name: '有电梯',
      id: "1"
    }],
    paixu: [{
      name: '月租',
      id: "monthRent"
    }, {
      name: '年租',
      id: "yearRent"
    }],
    chaoxiang: [{
      name: '东',
      id: "east"
    }, {
      name: '西',
      id: "west"
    }, {
      name: '南',
      id: "south"
    }, {
      name: '北',
      id: "north"
    }, {
      name: '南北',
      id: "southNorth"
    }],
    lc: [{
      name: '低楼层',
      id: "1"
    }, {
      name: '中楼层',
      id: "2"
      },{
        name: '高楼层',
        id: "3"
      }],
    //参数传后台
    region: '5101',
    rentFee: '',
    sort: '',
    //户型~楼层
    room: '',
    area: '',
    tag: '',
    elevator: '',
    rentType: '',
    toward: '',
    floor: '',

    keywords:'',
    // one: 0,
    // two: 0,
    // third: 0,
    // four: 0,
    // five: 0,
    // six: 0,
    // seven: 0,
    // eight: 0,
    // nine:0,
    ////
    qyopen: false,
    qyshow: false,
    select1: '',
    select2: '',
    cityleft: cityData.getCity(),
    citycenter: cityData.getCity()['区域'],
    cityright: {},
    topNum: 0,
    scrollHeight: 667
  },
  ////
  ////
  isShow: true,
  currentTab: 0,
  scroll: function(e) {
    let that = this,
      a = 1;

    that.top = e.detail.scrollTop;
    that.setData({
      totop: e.detail.scrollTop
    })

  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  setPition: function() {
    wx.navigateTo({
      url: '../compition-detail/compition-detail'
    })
  },
  vunue: function() {
    wx.navigateTo({
      url: '../vunue-item/vunue-item',
    })
  },
  selectPlace: function() {
    wx.navigateTo({
      url: '../selectPlace/selectPlace',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 
  lower:function(){
    if (this.data.hasMoreData){
      this.requestfun();
    } 
    
    wx.showLoading({
      title: '加载中',
    }),
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

  },
  bindconfirm:function(e){
    this.setData({
      keywords: e.detail.value,
      pageNum:1
    })
    this.requestfun();
    
  },
  onloadfun: function () {
    var that = this; 
    var contentlistTem = this.data.contentlist;
    var pagenum = this.data.pageNum;
    wx.request({
      
      url: 'https://cloud.wboyuan.com/app/wx/houseList.do',
      data: {
       
        region: that.data.region,
        
      },
      header: {
        //  'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method:"POST",
      success: function (res) {
        if (res.data.status) {
          var clist = res.data.object.data;
          if (clist.length < 10) {
            that.setData({
              contentlist: contentlistTem.concat(clist),
              hasMoreData: false,
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(clist),
              hasMoreData: true,
              pageNum: pagenum + 1,
            })
          }
          let hostInfo = that.data.contentlist;
          for (let j in clist) {

            let list = clist[j];
            if (list.tag.length > 0 && typeof (list.tag) == "string") {
              list.coverPhoto = "https://cloud.wboyuan.com/static/" + list.coverPhoto;
              list.tag = list.tag.split(",");
            }
          }

          that.setData({
            houseinfo: clist,
          });

        }

      }
    })
  },
  requestfun:function(){
    var that = this;
    var pagesize=this.data.pagesize;
    var pagenum = this.data.pageNum;
    var contentlistTem = this.data.contentlist;
    wx.request({
      url: 'https://cloud.wboyuan.com/app/wx/houseList.do',
      data: {
        keywords: that.data.keywords,

        pageNo: that.data.pageNum,
        rentFee: that.data.rentFee,
        region:that.data.region,
        sort: that.data.sort,
        //筛选
        room: that.data.room,
        area: that.data.area,
        tag: that.data.tag,
        elevator: that.data.elevator,
        rentType: that.data.rentType,
        toward: that.data.toward,
        floor: that.data.floor,
      },
      method: "POST",
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        if (res.data.status) {
          if (pagenum == 1){
           
            contentlistTem=[];
          }
          var clist=res.data.object.data;
          if (clist.length < 10){
           that.setData({
             contentlist: contentlistTem.concat(clist),
             hasMoreData: false,
           })
          }else{
            that.setData({
              contentlist: contentlistTem.concat(clist),
              hasMoreData: true,
              pageNum:pagenum+1,
             
            })
          }
           let hostInfo = that.data.contentlist;
          for (let j in hostInfo) {

            let list = hostInfo[j];
            if (list.tag.length > 0 && typeof(list.tag) == "string") {
              list.coverPhoto = "https://cloud.wboyuan.com/static/"+list.coverPhoto
              list.tag = list.tag.split(",");
            }
          }
          that.setData({
            houseinfo: hostInfo,
          });

        }

      }
    })
  },
  loadimg:function(){
    var that=this;
      wx.request({
        url: 'https://cloud.wboyuan.com/app/wx/topPic.do ',
        method:"POST",
        data: {
          
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if(res.statusCode == 200){
            if (res.data.object.pic != "" && res.data.object.pic !=null){
              that.setData({
                imgonload: "https://cloud.wboyuan.com/static/"+res.data.object.pic
                })
            }else{
              that.setData({
                imgonload: "/image/20180827145731.jpg"
              })
            }
          }
         
        }
      })
  },
  onLoad: function() {
    
    var that = this;
    this.loadimg();
    this.onloadfun();

    let scrollHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      scrollHight: scrollHeight
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  hideNav: function() {
    this.setData({
      displays: "none"
    })
  },
  // 区域
  tabNav: function(e) {
    this.setData({
      topNum: 231
    })
    if (this.data.qyopen) {
      this.setData({
        qyopen: false,

        qyshow: false,
      })
    } else {
      this.setData({
        qyopen: true,

        qyshow: false,
      })
    }
    //当前固定的值
    this.setData({
      displays: "block"
    })
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {

      var showMode = e.target.dataset.current == 0;

      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  // 下拉切换中的切换
  // 区域
  selected: function(e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  },
  selected1: function(e) {
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected2: function(e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  // 下拉菜单1 2 3 4
  // 区域
  clickSum: function(e) {
    this.setData({
      _sum: e.target.dataset.num
    })
    this.setData({
      first: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    var text = this.data.name
  },

  clickMum: function(e) {
    this.setData({
      _mum: e.target.dataset.num
    })
    this.setData({
      displays: "none"
    })
    var text = this.data.name
  },

  clickCum: function(e) {
    this.setData({
      _cum: e.target.dataset.num
    })
    this.setData({
      displays: "none"
    })
    var text = this.data.name
  },


  // 售价
  clickNum: function(e) {
    var canshu = e.target.dataset.num
    this.setData({
      topNum: 231,
      rentFee: canshu,
      pageNum:1
    })
    this.setData({
      _num: e.target.dataset.num
    })
    this.setData({
      second: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    
    this.requestfun();

  },

  //区域
  clickqy: function(e) {
    var canshu = e.target.dataset.city
    this.setData({
      first: e.target.dataset.name,
      region: e.target.dataset.city,
      pageNum: 1
    })
    this.setData({
      displays: "none"
    })
    //------------查询
    this.requestfun();

  },
  // 房型
  clickHouse: function(e) {
    var canshu = e.target.dataset.num;
    this.setData({
      _res: e.target.dataset.num,
      sort: canshu,
      pageNum: 1
    })
    this.setData({
      thirds: e.target.dataset.name
    })
    this.setData({
      displays: "none"
    })
    //----------查询
    this.requestfun();
  },


  // 筛选
  choseTxtColor: function(e) {
    this.setData({
      topNum: 231
    })
    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    var item = this.data.array[id];
    item.isSelected = !item.isSelected;
    this.setData({
      array: this.data.array,
    })
  },
  chaoxiang: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    var canshu = e.currentTarget.dataset.canshu;
    this.setData({
      eight: id,
      toward:canshu
    })
  },
  louceng: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    var canshu = e.currentTarget.dataset.canshu;
    this.setData({
      third: id,
       room: canshu
    })
  },
  zhuangxiu: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    var canshu = e.currentTarget.dataset.canshu;
    this.setData({
      four: id,
      area:canshu
    })
  },
  leibei: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值 
    var canshu = e.currentTarget.dataset.canshu;
    this.setData({
      five: id,
      tag:canshu
    })
  },
  tese: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    var canshu = e.currentTarget.dataset.canshu;
    this.setData({
      six: id,
      elevator:canshu
    })
  },
  paixu: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    var canshu = e.currentTarget.dataset.canshu;
    this.setData({
      seven: id,
      rentType:canshu
    })
  },
  lc: function(e) {
    var id = e.currentTarget.dataset.id; //获取自定义的ID值  
    var canshu = e.currentTarget.dataset.canshu;
    this.setData({
      nine: id,
      floor: canshu
    })
  },
  qingchu: function() {
    this.setData({
      one: 100,
      two: 100,
      third: 100,
      four: 100,
      five: 100,
      six: 100,
      seven: 100,
      eight: 100,
      nine: 100,

      room: '',
      area: '',
      tag: '',
      elevator: '',
      rentType: '',
      toward: '',
      floor: '',
    })
  },
  queren: function() {
    this.setData({
      pageNum: 1
    })
    this.setData({
      displays: "none"
    })
    this.requestfun();
  },
  selectleft: function(e) {
    this.setData({
      cityright: {},
      //选哪个省
      citycenter: this.data.cityleft[e.currentTarget.dataset.city],
      select1: e.target.dataset.city,
      select2: ''
    });
  },
  selectcenter: function(e) {
    this.setData({
      //选哪个市
      cityright: this.data.citycenter[e.currentTarget.dataset.city].list,
      select2: e.target.dataset.city
    });
  },

})