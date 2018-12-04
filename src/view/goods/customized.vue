<!-- 个性定制 -->
<template>
  <div>
    <head-bar title="个性定制" :menu="true"></head-bar>

    <div class="box">
      <div class="bg"></div>

      <div class="list-item">
        <div class="label">定制照片 <small>请上传图片</small></div>
        <upload-img-1 v-model="params.imgs"></upload-img-1>
      </div>

      <div class="list-item">
        <div class="label">定制字体</div>
        <form-select style="width: 64vw;margin:5px 0 2px 0;" :list="fontList" v-model="params.fontFamily"></form-select>
      </div>

      <div class="list-item">
        <div class="label">定制数量</div>
        <form-number v-model="params.num" style="margin-top:5px;"></form-number>
      </div>

      <div class="list-item">
        <div class="label">定制备注</div>
        <div class="remark">
          <textarea v-model="params.remark" cols="30" rows="3" placeholder="请输入您的详细要求"></textarea>
        </div>
      </div>
    </div>

    <button class="btn btn-block btn-red btn-sub" type="button" @click="confirm()">提交订单</button>

    <foot-bar></foot-bar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: new this.Loading('提交中'),
        fontList: [                                  // 字体列表
          {id: '宋体', name: '宋体'},
          {id: '微软雅黑', name: '微软雅黑'}
        ],
        params: {
          imgs: '',   //  定制照片
          fontFamily: '微软雅黑',   //  定制字体
          num: 1,          //  定制数量
          remark: ''        //  定制备注
        }
      }
    },
    methods: {
      //  提交订单
      confirm() {
        if(!this.params.imgs) {
          this.$message.error('请上传定制照片')
        }else if(!this.params.fontFamily) {
          this.$message.error('请选择定制字体')
        }else if(!this.params.num) {
          this.$message.error('请设置定制数量')
        }else {
          this.loading.show()
          this.$http.post('/api/order', this.params).then(res => {
            this.loading.hide()
            this.$router.push({name: 'orderdetail', query: {orderid: '5541515', type: 0}})
          }).catch(err => {
            this.loading.hide()
          })

          //  测试数据
          setTimeout(() => {
            this.$router.push({name: 'orderdetail', query: {orderid: '5541515', type: 0, custom: 1}})
          }, 50)
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .box {
    border-top: 5px solid #f7f7f7;
    border-bottom: 10px solid #f7f7f7;
    padding-bottom: 3px;
    .bg {
      background: #eaeaea;
      height: 10px;
    }
  }

  .list-item {
    color: #000;
    font-size: 14px;
    padding: 8px 0;
    margin-left: 12px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    .upload {
      margin: 10px 0;
    }
    .label {

      white-space: nowrap;
      line-height: 24px;
      small {
        margin-left: 8px;
        font-size: 13px;
        color: #ccc;
      }
    }
    .remark {
      border-top: 1px solid rgba(247, 247, 247, 1);
      margin-left: -12px;
    }
    textarea {
      width: 100%;
      border: none;
      padding: 5px 12px;
    }
  }

  .btn-sub {
    width: 70vw;
    margin: 23px auto;
    border-radius: 10px;
    height: 35px;
  }
</style>
