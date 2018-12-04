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
          <input type="text" placeholder="省、市、区" v-model="positiontext">
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
    methods: {
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
          this.$http.post('/api/user/address', this.params).then(res => {
            this.loading.hide()
          //  判断是否提交成功，给出相应提示及操作
          //  todo ...
          this.$message.success('添加成功')
          this.$router.push('/address')
        }).catch(err => {
            this.loading.hide()
          this.$message.error('添加失败，请重试')
        })
        }
      },
      //  删除地址
      del() {

        this.loading.show()
        this.$http.post('/api/address/delete', {
          id: this.id
        }).then(res => {

          this.loading.hide()

        this.$message.success('删除成功')
        this.$router.push('/address')

      }).catch(err => {
          this.loading.hide()

        this.$message.error('删除失败，请重试')

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
