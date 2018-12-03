<template>
  <div>
    <div class="list-item" v-for="item,i in box.params" :key="i">
      <div class="label">
        {{item.title}}
        <div class="other-modal" v-if="item.type == 4" @click="getIcon(item, i, box)">其它模板</div>
      </div>
      <div style="flex: 1;">
        <input v-if="item.type == 1" type="text" v-model="item.text" @change="setDesign(box, i, wordEle)" placeholder="请输入">

        <form-select v-if="item.type == 2" :list="item.selList" v-model="item.selText" @change="setDesign(box, i, wordEle)" style="display:inline-block;"></form-select>

        <input v-if="item.type == 3 && item.istext" v-model="item.text" type="text" placeholder="请输入">
        <upload-img-1 v-if="item.type==3 && !item.istext" :url.sync="item.url"></upload-img-1>

        <div v-if="item.type == 4 && item.iconlist" class="xz-box" style="width:100%;">
          <div class="item" v-for="el,k in item.iconlist" :key="k" :class="{'active': item.url == el.url}">
            <div class="img" @click="setIconUrl(i, el.url, box)"><img :src="el.url" alt=""></div>
            {{el.text}}
          </div>
        </div>
      </div>

      <!--<input type="text" placeholder="旋转角度" v-model="item.rotate" style="width: 30px;">-->


    </div>

    <modal-box :show-modal.sync="showModal" :icons="icons" :setIconUrl="setIconUrl"></modal-box>
  </div>

</template>

<script>
  import modalBox from './modal.vue'

  export default {
          props: {
                  box: Object,
            wordEle: Object
          },
          data () {
                  return {
                    showModal: false,
                    icons: {                                     // 其它模板列表
                      index: '',                            // 当前数据所属的定制参数索引值
                      ele: {params: []},                              // 当前数据所属的定制正面或背面
                      list: []
                    },
                  }
          },
    watch: {
            wordEle(val) {
             // console.log(val)
              if(val.length) {
                let that = this
                val.each(function(i) {
                  new MyDrag({
                    el: $(this)[0],
                    parent: $(this).parent()[0]
                  })
                  that.setDesign(that.box, i, that.wordEle)
                })
              }
            }
    },
    methods: {
      // 选择不同的图标，更新显示
      setIconUrl(i, url, ele) {
        let p = ele.params[i]
        p.url = url
        ele.params.splice(i, 1, p)
        // this.showModal = false
      },
      // 更新参数显示
      setDesign(ele, i, word) {
        let p = ele.params[i]
        if(p.type == 1 || p.type == 2) {
          let radio = p.radio, radius
          if(p.type == 2)  ele.params.splice(i, 1, p)
          if(word.eq(i).find('span').length > 0)  word.eq(i).arctext('destroy')
          if(p.type == 1){
            word.eq(i).text(p.text)
          }else if(p.type == 2) {
            word.eq(i).text(p.selText)
          }

          if(radio) {
            radius = word.eq(i).width() * 180 / (Math.PI * radio)
            word.eq(i).arctext({radius: parseFloat(radius)})
          }
        }

      },
      //  获取其它模板
      getIcon(item, i, ele) {
        this.showModal = true
        this.icons.index = i
        this.icons.ele = ele
        this.$http.get('/api/good/icon', {
          params: {
            id: item.iconsid
          }
        }).then(res => {
          this.icons.list = res.data

        }).catch(err => {
          this.icons.list = []
        })

        //  测试数据
        setTimeout(() => {
          this.icons.list = [
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
          ]
        }, 50)
      },
    },
    components: {
            'modal-box': modalBox
    }
  }
</script>
