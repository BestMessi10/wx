
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:'https://cloud.wboyuan.com/static/',
    autoplay:true,
    interval:5000,
    duration:500,
    imgUrls:[],
    imgtotal:'',
    imgnew:'1',
    /*展开收起 */
    openmo:'0',
    /*地图数据 */
    latitude: '',
    longitude: '',
    scale:18,
    markers: [],
    //详情数据
    title:'', //标题
    rentFee:'',
    room:'',
    offic:'',
    toilet:'',
    area:'',
    describe_img:[],
    publishDate:'',
    checkIn:'',
    rentTime:'',
    lookHouse:'',
    floor:'',
    totalFloor:'',
    elevator:'',
    parkingLot:'',
    useWater:'',
    useElectric:'',
    gas:'',
    useHeating:'',
    comName: '',
    isTv: '',
    isFridge: '',
    isWasher: '',
    isAir: '',
    isHotWater: '',
    isBed: '',
    isWifi: '',
    isWardrobe: '',
    isNatGas: '',
    des: '',
    middleman: '',
    phone: '',
    rentPay:'',
    deposit:''
  },
  //轮播图变化
  swiperChange:function(e){
    this.setData({
      imgnew: e.detail.current+1   //获取当前轮播图片的下标
    })
  },
  //图片放大
  enlarge:function(e){
    var data = this.data.imgUrls;
    if(data.length>0){
      for(var i=0;i<data.length;i++){
        data[i] = this.data.img_url+data[i];
      }
    }
  
    //图片预览
     wx.previewImage({
       current: e.currentTarget.dataset.url, // 当前显示图片的http链接
       urls: data // 需要预览的图片http链接列表
    })
  },
  /**展开更多数据 */
  openmore:function(){

     var that=this;
    that.setData({
      openmo:'1'
    })

  },
  /* 地图点击事件 */
  mapbindtap:function(e){
    var that=this
    wx.navigateTo({
      url: "/pages/map/map?latitude=" + that.data.latitude + '&longitude=' + that.data.longitude
    })
  },
  //拨打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  onLoad: function(options){ 
    var that=this;
    var houseid = options.id; 
   // var houseid=17
    //判断id是否为空
    if(houseid!=''&&houseid!=null){
      wx.request({
        url: 'https://cloud.wboyuan.com/app/wx/houseDetail.do', //仅为示例，并非真实的接口地址
        data: {
          id: houseid
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        success: function (res) {
      
          //状态为true
          if (res.data.status){
            //接收数据
            var data = res.data.object;
            //轮播图片
            var nav_img = [];
            if(data.pics!=''){
              nav_img = data.pics.split(',');
            }
            //页面标题(data.title)
            //房租费(data.rentFee)
            //户型(室:data.room，厅:data.offic,卫:toilet)
            //面积(data.area)
            //房子描述图标(data.tag)
            var describe_img=[]
            if(data.tag!=''){
              describe_img=data.tag.split(',');
            }
            //发布时间
            //data.publishDate
            //入住(data.checkIn )
            //租期(data.rentTime)
            //看房(data.lookHouse)
            //楼层(当前楼层:data.floor,总楼层:data.totalFloor)
            //电梯(data.elevator 1:有 2:无 0:暂无数据)
            //车位（data.parkingLot 1:自有车位 2:租用车位）
            //用水(data.useWater 1:民用水 2:商用水 0:暂无数据)
            //用电（data.useElectric 1:民电 2:商电 0:暂无数据）
            //燃气（data.gas 1有 2无 0暂无数据）
            //采暖(data.useHeating 1集中采暖 2商业采暖 0暂无数据)

            //小区名称(data.comName)
            //精度 纬度(data.longitude,data.latitude)
            
            //统一1有 0无
            //电视(data.isTv)
            //冰箱(data.isFridge)
            //洗衣机(data.isWasher)
            //空调(data.isAir)
            //热水器(data.isHotWater)
            //床(data.isBed)
            //暖气(data.useHeating )
            //宽带(data.isWifi)
            //衣柜(data.isWardrobe)
            //天然气(data.isNatGas)

            //描述(data.des)  
            var openmo='0';
            if (data.des.length<100){
              openmo='1'
            }
            //中间人(data.middleman)
            //电话(data.phone)
            //月付（data.rentPay）
            //押金(data.deposit)

            //地图创建
            var maplist = [];
            var map = {};
            var callout = {};
            map.id = 0;
            map.latitude = data.latitude;
            map.longitude = data.longitude;
            map.iconPath = '/image/map.png';
            map.width = 20;
            map.height = 20;
            //添加图标
            callout.content = data.comName;
            callout.color = "#000000";
            callout.padding = 8;
            callout.fontSize=18
            callout.display = 'ALWAYS';
            callout.textAlign = 'center';
            callout.bgColor = '#ffffff';
            callout.borderRadius = '10';
            map.callout = callout;
            maplist.push(map);

            that.setData({
              imgUrls: nav_img,
              title: data.title, 
              publishDate: data.publishDate,
              rentFee: data.rentFee,
              room: data.room,
              offic: data.offic,
              toilet: data.toilet,
              area: data.area,
              describe_img: describe_img,
              publishDate: data.publishDate,
              checkIn: data.checkIn,
              rentTime: data.rentTime,
              lookHouse: data.lookHouse,
              floor: data.floor,
              totalFloor: data.totalFloor,
              elevator: data.elevator,
              parkingLot: data.parkingLot,
              useWater: data.useWater,
              useElectric: data.useElectric,
              gas: data.gas,
              useHeating: data.useHeating,
              comName: data.comName,
              isTv: data.isTv,
              isFridge: data.isFridge,
              isWasher: data.isWasher,
              isAir: data.isAir,
              isHotWater: data.isHotWater,
              isBed: data.isBed,
              isWifi: data.isWifi,
              isWardrobe: data.isWardrobe,
              isNatGas: data.isNatGas,
              des: data.des,
              middleman: data.middleman,
              phone: data.phone,
              openmo: openmo,
              imgtotal: nav_img.length,
              rentPay:data.rentPay,
              deposit: data.deposit,
              latitude: data.latitude,
              longitude: data.longitude,
              markers: maplist
            })
   
          }else{
            wx.showToast({
              title: res.data.object,
              image: '/image/cha.png',
              duration: 2000
            })
          }
         
        }
      })
    }else{
      wx.showToast({
        title: '系统错误',
        image: '/image/cha.png',
        duration: 2000
      })

    }
  } 
})
