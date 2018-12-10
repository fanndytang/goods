<template>
  <div>
    <my-scroll :notip="true"
               :list.sync="list"
               url="/api/list/address">

      <head-bar :back="true" title="收货地址">
        <router-link class="text-primary f14" to="/editaddress">添加新地址</router-link>
      </head-bar>

      <div>
        <div class="list" v-for="item,i in list.data" :key="i">
          <div @click="selectAddress(item)">
            <span class="name">{{item.name}}</span>
            <span class="tel">{{item.tel}}</span>
            <div class="address">{{item.address}}</div>
          </div>
          <div class="bar">
            <div class="flex">
              <span class="check-box"><input @change="setDefault(item)" name="address" type="radio" :checked="item.isDefault"><span class="icon" style="margin-right:5px;"></span> 设为默认</span>
            </div>
            <img class="del" height="22px" :src="require('@/assets/icons/icon_del.png')" alt="" @click="del(item, i)">
            <img class="edit" height="22px" :src="require('@/assets/icons/icon_edit.png')" alt="" @click="$router.push({name: 'editaddress', query: {id: item.id, orderid: orderid}})">
          </div>
        </div>
      </div>

    </my-scroll>

    <!-- <scroll-top el=".address-index-scroll"></scroll-top>-->

  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: new this.Loading('删除中'),
        list: {
          rows: 10,   // 一次显示多少条
          current: 0,  // 当前显示的页数
          totals: 0,   // 总共有多少条
          data:[]
        },
        orderid: this.$route.query.orderid || false,   // 是否需要选择地址
        customid: this.$route.query.customid,
        designid: this.$route.query.designid,
      }
    },
    methods: {
      // 选择地址
      selectAddress(item) {
        if(this.orderid) {
                this.loading.show('正在提交')
          this.$http({
            url: '',
            method: 'post',
            data: {
                    sn: this.orderid,
              addressid: item.id
            },
            success: (data) => {
              sessionStorage.setItem('siyj-orderaddressid'+this.orderid, item.id)
              sessionStorage.setItem('siyj-orderaddressname'+this.orderid, item.name)
              sessionStorage.setItem('siyj-orderaddresstel'+this.orderid, item.tel)
              sessionStorage.setItem('siyj-orderaddressaddress'+this.orderid, item.address)
              this.loading.hide()
              this.$router.go(-1)
            },
            error: (data) => {
              this.loading.hide()
                    this.$message.error('地址设置失败，请重试')
            }


          })

        }else if(this.customid) {
          sessionStorage.setItem('siyj-customid'+this.customid, JSON.stringify(item))
          this.$router.go(-1)
        }else if(this.designid) {
          sessionStorage.setItem('siyj-designid'+this.designid, JSON.stringify(item))
          this.$router.go(-1)
        }
      },
      //  删除地址
      del(item, index) {
        this.loading.show()

        this.$http({
          url: '',
          method: 'post',
          data: {
            id: item.id
          },
          success: (data) => {
            this.loading.hide()
            if(this.orderid && (sessionStorage.getItem('siyj-orderaddressid'+this.orderid) == item.id)) {  // 如果删除了当前订单所选的地址，则对应清空订单重新选择的地址
              sessionStorage.removeItem('siyj-orderaddressid'+this.orderid)
              sessionStorage.removeItem('siyj-orderaddressname'+this.orderid)
              sessionStorage.removeItem('siyj-orderaddresstel'+this.orderid)
              sessionStorage.removeItem('siyj-orderaddressaddress'+this.orderid)
            }
            this.list.data.splice(index, 1)
            this.$message.success('删除成功')
          },
          error: (data) => {
            this.loading.hide()
            this.$message.error('删除失败，请重试')
          }


        })

      },
      //  设置默认地址
      setDefault(item) {

        this.loading.show()


        this.$http({
          url: '/default',
          method: 'post',
          data: {
            id: item.id
          },
          success: (data) => {
            this.loading.hide()
          },
          error: (data) => {
            this.loading.hide()
            this.$message.error('设置失败，请重试')
            item.isDefault = false
          }


        })


      }
    }
  }
</script>

<style lang="less" scoped>
  .list {
    border-top: 10px solid #eaeaea;
    font-size: 14px;
    color: #333;
    padding: 12px 0 0 12px;
    &:last-child {
      border-bottom: 10px solid #eaeaea;
    }
    .name, .tel {
      display: inline-block;
      margin-right: 20px;
      line-height: 26px;
      font-weight: 600;
    }
    .address {
      line-height: 18px;
      width: 80%;
    }
    .bar {
      margin-top: 13px;
      border-top: 1px solid rgba(230, 230, 230, 1);
      padding-top: 4px;
      height: 45px;
      display: flex;
      align-items: center;
      .flex {
        flex: 1;
      }
      .edit, .del {
        margin-right: 15px;
      }
    }
  }


</style>
