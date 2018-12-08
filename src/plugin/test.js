import country from '@/plugin/country'
let obj = {
  '/api/user/login': {
    uid: 1,
    Authorization: 'agdsagdsg'
  },
  '/api/list/hot': {  // 首页热卖
    data: [
      {id: '1', imgUrl: './static/img/goods.png', title: '宝宝生 ', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}]},
      {id: '2', imgUrl: './static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'},]},
      {id: '3', imgUrl: './static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'}, {id: 1, name: '限时折扣', value: '#00bc0d'},]},
      {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: 'orange'}]},
      {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '7', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '8', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '9', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '10', imgUrl: '', title: '宝宝生辰定制牌'},
    ],
    page: {
      totals: 35
    }
  },


  '/api/list/news': {
    data: [
      {id: '1', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '2', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '3', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '4', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '5', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '6', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '7', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '8', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '9', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
      {id: '10', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
    ],
    page: {
      totals: 35
    }
  },

  '/api/list/goodlist': {
    data: [
      {id: '1', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}]},
      {id: '2', imgUrl: './static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'},]},
      {id: '3', imgUrl: './static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'}, {id: 1, name: '限时折扣', value: '#00bc0d'},]},
      {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: 'orange'}]},
      {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '7', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '8', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '9', imgUrl: '', title: '宝宝生辰定制牌'},
      {id: '10', imgUrl: '', title: '宝宝生辰定制牌'},
    ],
    page: {
      totals: 35
    }
  },


  '/api/list/address': {
    data: [
      {id: '1', name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: true},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
      {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
    ],
    page: {
      totals: 35
    }
  },

  '/api/list/orderlist': {
    data: [
      {id: 1, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 2, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 3, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 4, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 5, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 6, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 7, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 8, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 9, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
      {id: 10, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},

    ],
    page: {
      totals: 35
    }
  },


  img(data) {
    let file = data.getAll('file'), url = ''
   // console.log(file)
    for(let k in file) {
    //  console.log(file[k])
    //  console.log(typeof file[k])
      if(typeof file[k] !== 'string') {
    //    console.log(file[k])
        url += (url?',':'') + URL.createObjectURL(file[k])
      }
    }
   // console.log(URL.createObjectURL(data.get('file')))
    return url
   // return ''
  },

  '/api/list/country': country,

  '/api/icons': [
    {
      title: '生肖图标',
      list: [
        {url: "./static/img/sx/su.png", text: '老鼠'},
        {url: "./static/img/sx/niu.png", text: '牛'},
        {url: "./static/img/sx/hu.png", text: '老虎'},
        {url: "./static/img/sx/tu.png", text: '兔子'},
        {url: "./static/img/sx/long.png", text: '龙'},
        {url: "./static/img/sx/se.png", text: '蛇'},
        {url: "./static/img/sx/ma.png", text: '马'},
        {url: "./static/img/sx/yang.png", text: '羊'},
        {url: "./static/img/sx/hou.png", text: '猴'},
        {url: "./static/img/sx/ji.png", text: '鸡'},
        {url: "./static/img/sx/gou.png", text: '狗'},
        {url: "./static/img/sx/zhu.png", text: '猪'},
      ]
    },
    {
      title: '性别图标',
      list: [
        {url: "./static/img/gender/nanhai.png", text: '男孩'},
        {url: "./static/img/gender/nvhai.png", text: '女孩'},
      ]
    },
    {
      title: '其它图标',
    }
  ],

  '/api/order/customized': '5541515',   // 订单号  个性定制提交订单
  '/api/order/design': '214321125',   // 订单号   商品定制 提交订单

  '/api/download': {},  //??不知道改怎么返回的额

  '/api/design/detail': {
    purchase: {   // 定制参数
      fontColor: 'blue',
      fontFamily: '微软雅黑',
      back: {
        backgroundImg: './static/img/g1.png',
        scale: 1,
        params: [
          {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '平安', title: '祝福祝福', top: 92, type: 1},
          {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '健康', title: '祝福祝福', top: 92, type: 1},
          {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '活泼', title: '祝福祝福', top: 92, type: 1},
          {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '', title: '祝福祝福', top: 92, type: 1},
          {enable: true, fontsize: '', left: 150, radio: '', rotate: '', title: '宝宝照片', top: 92, istext: false, type: 3}
        ]
      },
      front: {
        backgroundImg: './static/img/goods.png',
        scale: 0.7967914438502673,
        params: [
          {enable: true, fontsize: '24', left: 221, radio: '40', rotate: '50', text: '50CM', title: '宝宝身高', top: 128, type: 1},
          {enable: true, fontsize: '30', left: 106.67959050484066, radio: '', rotate: '', text: '张北海', title: '宝宝姓名', top: 129.26845637583892, type: 1},
          {enable: true, fontsize: '24', left: 92, radio: '50', rotate: '180', text: '2018.07.14', title: '出生日期', top: 305, type: 1},
          {enable: true, fontsize: '24', left: 44, radio: '', rotate: '', text: 'AM,PM', title: '上午下午', top: 210, type: 2},
          {enable: true, left: 100, rotate: '', istext: true, text: '', title: '出生时间', top: 150, type: 3},
          {enable: true, fontsize: '24', left: 23, radio: '70', rotate: '-50', text: '3700g', title: '宝宝重量', top: 120, type: 1},
          {enable: true, left: 150, rotate: '30', title: '宝宝星座', top: 92, type: 4,
            width: 100,
            height: 100,
            url: '',
            iconsid: 1,
            iconlist: [
              {id: 1, text: '白羊座', url: "http://pic33.photophoto.cn/20141022/0019032438899352_b.jpg",},
              {id: 1, text: '白羊座', url: "./static/img/xz/baiyang.png",},
              {id: 2, text: '金牛座', url: "./static/img/xz/jinniu.png",},
              {id: 3, text: '双子座', url: "./static/img/xz/shuangzi.png",},
              {id: 4, text: '巨蟹座', url: "./static/img/xz/jujie.png",},
              {id: 5, text: '狮子座', url: "./static/img/xz/shizi.png",},
              {id: 6, text: '处女座', url: "./static/img/xz/chunv.png",},
            ]
          }
        ]
      }
    },
    dict: [
      {title: '成色', text: 'Ag999,银镀金,银镀金,银镀金,银镀金,银镀金,银镀金,银镀金'},
      {title:  '重量', text: '20g,30g'},
      {title: '规格', text: '20*23.8mm,20*10.4mm'}
    ]
  },

  '/api/goods/detail': {
    id: 1,
    title: '宝宝生辰定制牌完美工艺创意可爱吊坠装饰吉祥款V3200B20',
    imgs: ['./static/img/g3.jpg',  './static/img/ad3.jpg'],
    tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'},],
    process: '<img style="width:100vw;display:block;" src="./static/img/d1.png" />',
    rules: '<img style="width:100vw;display:block;" src="./static/img/d2.png" />',
    detail: '<img style="width:100vw;display:block;" src="./static/img/d3.jpg" />',
  },

  '/api/goods/category': [
    {title: '新品上牌', type: 1},
    {title: '节日限定', type: 2},
    {title: '情侣定制', type: 3},
    {title: '宝宝定制', type: 4},
    {title: '父母父母', type: 5},
  ],

  '/api/list/newgood': [
    {id: '1', imgUrl: './static/img/goods.png', title: '宝宝生辰'},
  //  {id: '2', imgUrl: './static/img/g1.png', title: '宝宝定制牌制牌定制牌制牌制牌'},
   // {id: '3', imgUrl: './static/img/g2.png', title: '宝宝生辰定制牌'},
   // {id: '3', imgUrl: '', title: '宝宝生辰定制牌'},
  ],

  '/api/user/info': {
    avatar: './static/img/g1.png',
    tel: '13800138000',
    companyname: '',  // 公司名称
    brand: '',  //  店铺品牌
    position: '',  //  店铺位置
    address: '',  // 详细地址
    username: '',  // 联系人员
    usertel: '',   //  联系电话
  },

  '/api/news/concat': {
    id: '1',
    date: '2018.11.15 12:00',
    title: '关于商家加盟最新条款事宜',
    describe: '<img src="./static/img/new.jpg" />关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'
  },

  '/api/news/join': {
    id: '1',
    date: '2018.11.15 12:00',
    title: '关于商家加盟最新条款事宜',
    describe: '<img src="./static/img/new.jpg" />关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'
  },

  '/api/news/detail': {
    id: '1',
    date: '2018.11.15 12:00',
    title: '关于商家加盟最新条款事宜',
    describe: '<img src="./static/img/new.jpg" />关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'
  },

  'api/order/detail':{
    id: 1,
    sn: '20181115093150001',
    date: '2018.11.15 09:31:50',
    imgUrl: './static/img/goods.png',
    title: '宝宝生辰定制牌',
    number: '100',
    size: 'Au999 20g 20*23.8mm',
    answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页',
    address: {
      name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金利1102室'
    },
    purchase: {
      fontColor: 'blue',
      fontFamily: 'A',
      back: {
        backgroundImg: '',
        params: [
          {
            enable: true,
            fontsize: '',
            left: 150,
            radio: '',
            rotate: '',
            text: '哈哈',
            title: '祝福祝福',
            top: 92,
            type: 1
          }
        ]
      },
      front: {
        backgroundImg: './static/img/goods.png',
        params: [
          {
            enable: true,
            fontsize: '12px',
            left: 150,
            radio: '30',
            rotate: '30',
            text: '张北海',
            title: '姓名姓名',
            top: 92,
            type: 1
          },
          {
            enable: true,
            fontsize: '12px',
            left: 150,
            radio: '30',
            rotate: '30',
            text: '男，女',
            title: '性别性别',
            top: 92,
            type: 2
          },
          {
            enable: true,
            left: 150,
            rotate: '30',
            url: './static/img/g1.png',
            height: '',
            width: '',
            title: '图片图片',
            top: 92,
            type: 3
          },
          {
            enable: true,
            left: 150,
            rotate: '30',
            title: '星座星座',
            top: 92,
            type: 4,
            url: './static/img/xz/baiyang.png',
            iconsid: 1,
            iconlist: [
              {id: 1, text: '白羊座', url: "./static/img/xz/baiyang.png",},
              {id: 2, text: '金牛座', url: "./static/img/xz/jinniu.png",},
              {id: 3, text: '双子座', url: "./static/img/xz/shuangzi.png",},
              {id: 4, text: '巨蟹座', url: "./static/img/xz/jujie.png",},
              {id: 5, text: '狮子座', url: "./static/img/xz/shizi.png",},
              {id: 6, text: '处女座', url: "./static/img/xz/chunv.png",},
            ]
          }
        ]
      }
    },
    chat: [
      {
        name: '客服',
        date: '2018.11.15 09:31:50',
        text: '最新设计效果图，请确认是否可以进行生产',
        imglist: [
          './static/img/goods.png',
          './static/img/ad1.jpg',
        ]
      },
      {
        name: '我',
        date: '2018.11.15 09:31:50',
        text: '谢谢，收到！'
      }

    ]
  },

  '/home/get_global_config': {
    webname: '',   // 网站名称
    logo: './static/img/logo.jpg',   // Logo
    ads: {
      home_banner: [   // 首页轮播图
        {
          id: '1',
          link: 'http://baidu.com',    // 图片链接
          url: './static/img/ad1.jpg',   // 图片地址
          type: '1'                     //  1: 图片  2： 视频
        },
        {
          id: '1',
          link: 'http://baidu.com',    // 图片链接
          url: 'http://pic19.nipic.com/20120308/4970979_102637717125_2.jpg',
          type: '1'                     //  1: 图片  2： 视频
        },
        {
          id: '2',
          link: '',
          type: '2',
          url: './static/img/ad1.jpg',
          videoUrl: 'http://220.112.193.197/mp4files/A18400000009E79A/vjs.zencdn.net/v/oceans.mp4' // 视频地址
        },
        {
          id: '2',
          link: '',
          type: '2',
          url: './static/img/ad1.jpg',
          videoUrl: 'http://pic.qiantucdn.com/58pic/shipin/17/49/00/17490072.mp4'
        }
      ],
      new_arrival: {link: '', url: './static/img/ad2.png'},  //  首页 新品专区(link 有值就跳转，否则不跳）
      hot_sale: {link: '', url: './static/img/ad3.jpg'},  // 首页 热卖专区(link 有值就跳转，否则不跳）
      goods_banner: {link: '', url: './static/img/banner.jpg'},  //  商品定制 头部(link 有值就跳转，否则不跳）
    }
  }



}

export default obj
