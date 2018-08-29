Page({
  data: {
    markers: [{
      iconPath: "/img/location.png",
      id: 0,
      latitude: 30.5549400000,
      longitude: 104.0652600000,
      width: 50,
      height: 50
    }],
    // polyline: [{
    //   points: [{
    //     longitude: 104.077,
    //     latitude: 30.677
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/img/locatio.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },
  backbtn:function(){
    wx.switchTab({
      url: '../user/user',
    })
    
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})