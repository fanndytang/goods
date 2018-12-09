<template>
  <div>
    <head-bar :back="true" :title="(id ? '编辑' : '添加') +'收货地址'" class="gray-border-bottom">
      <span class="text-primary f14" @click="confirm()">保存</span>
    </head-bar>

    <div class="box">
      <div class="input-field">
        <div class="label">收货人 <span>*</span></div>
        <input type="text" placeholder="请输入收货人姓名" v-model="params.name">
      </div>

      <div class="input-field">
        <div class="label">联系电话 <span>*</span></div>
        <input type="text" placeholder="请输入手机号码" v-model="params.tel">
      </div>

      <div class="input-field">
        <div class="label">所在地区 <span>*</span></div>
        <select-country class="between" v-model="params.position" :text.sync="positiontext">
          <span style="line-height:30px;" :style="positiontext ? '' : 'color:#ccc;'">{{positiontext || '省、市、区'}}</span>
        <!--  <input type="text" placeholder="省、市、区" v-model="positiontext">-->
          <img height="22px" :src="require('@/assets/icons/icon_qianjin.png')" alt="">
        </select-country>
      </div>

      <div class="input-field">
        <div class="label">详细地址 <span>*</span></div>
        <input type="text" placeholder="例：道路、小区、楼栋号、单元室等" v-model="params.address">
      </div>

      <div class="input-field">
        <div class="between checkbox">
          <div class="label">设为默认地址</div>
          <span class="check-box"><input type="checkbox" v-model="params.isDefault"><span class="icon"></span></span>
        </div>
       </div>

      <div class="input-field del" v-if="!!id" @click="del()">  <!-- 编辑时显示-->
        删除地址
      </div>


    </div>
  </div>
</template>

<script>

  export default {
      data () {
          return {
            id: this.$route.query.id,
            loading: new this.Loading('提交中'),
            positiontext: '',
              params: {
                  isDefault: false,  //  是否默认
                id: '',   //id
                name: '',   // 姓名
                tel: '',  //  电话
                position: '',   //  所在地区
                address: '',  //  详细地址
              }
          }
      },
    mounted() {
        if(this.id) this.getInfo()
    },
    methods: {
        getInfo() {
          this.loading.show('加载中')
          this.$http({
            url: '',
            data: {
              id: this.id
            },
            success: (data) => {
              this.loading.hide()
            this.params = data.data

          },
          error: (data) => {
              this.loading.hide()
          }
          })
        },
      // 提交
      confirm() {
        if(!this.params.name) {
          this.$message.error('请输入收货人姓名')
        }else if(!this.params.tel) {
          this.$message.error('请输入联系电话')
        }else if(!this.params.position) {
          this.$message.error('请选择所在地区')
        }else if(!this.params.address) {
          this.$message.error('请输入详细地址')
        }else {
          this.loading.show()

          this.params.isDefault = this.params.isDefault ? 1 : 0

          this.$http({
            url: '',
            method: 'post',
            data: this.params,
            success: (data) => {
              this.loading.hide()
              this.$message.success('提交成功')
            //  this.$router.push('/address')
            },
            error: (data) => {
              this.loading.hide()
              this.$message.error('提交失败，请重试')
            }

          })

        }
      },
      //  删除地址
      del() {

        this.loading.show()

        this.$http({
          url: '',
          method: 'post',
          data: {
            id: this.id
          },
          success: (data) => {
            this.loading.hide()
            this.$message.success('删除成功')
            this.$router.push('/address')
          },
          error: (data) => {
            this.loading.hide()
            this.$message.error('删除失败，请重试')
          }

        })

      }
    }
  }
</script>


<style lang="less" scoped>
  .box {
    padding: 0 0 0 15px;
    border-top: 5px solid #f7f7f7;
  }
  .checkbox {
    padding-right: 10px;
    height: 73px;
  }

  .del {
    color: #f20246;
    height: 50px;
    line-height: 50px;
  }

</style>
