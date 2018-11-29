<template>
  <div>
    <my-scroll :on-infinite="getList"
               :loading="load"
               :notip="true"
               :nodata="list.data.length >= list.totals"
               class="address-index-scroll">

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
              <span class="check-box"><input @change="setDefault(item)" type="checkbox" v-model="item.isDefault"><span class="icon"></span> 设为默认</span>
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
            load: false,
            loading: new this.Loading('删除中'),
            list: {
              rows: 10,   // 一次显示多少条
              current: 0,  // 当前显示的页数
              totals: 0,   // 总共有多少条
              data:[]
            },
            orderid: this.$route.query.orderid || false   // 是否需要选择地址
          }
      },
    mounted () {
        this.getList()
    },
    methods: {
        // 获取地址
      getList(done) {
        if(this.list.data.length > 0 && this.list.data.length >= this.list.totals) return false
        console.log('111')
        this.load = true
        ++ this.list.current
        this.$http.get('/api/address/list', {
          params: {
            rows: this.list.rows,
            current: this.list.current
          }
        }).then(res => {
          //  this.load = false
          this.list.data = this.list.data.concat(res.data.data)
        this.list.totals = res.data.page.totals

        if(done) done()
      }).catch(err => {
          // this.load = false
          // if(done) done()
        })

        // 测试数据
        setTimeout(() => {
          let res = {
            data:[
                  {id: '1', name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: true},
                  {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
            ],
            page: {
              totals: 2
            }
          }

          this.list.data = this.list.data.concat(res.data)
        this.list.totals = res.page.totals
        this.load = false
console.log(res.data)
        if(done)done();
      }, 200)

      },
              // 选择地址
      selectAddress(item) {
              if(this.orderid) {
                      sessionStorage.setItem('siyj-orderaddressid'+this.orderid, item.id)
                      sessionStorage.setItem('siyj-orderaddressname'+this.orderid, item.name)
                      sessionStorage.setItem('siyj-orderaddresstel'+this.orderid, item.tel)
                      sessionStorage.setItem('siyj-orderaddressaddress'+this.orderid, item.address)
                      this.$router.go(-1)
              }
      },
        //  删除地址
        del(item, index) {
          this.loading.show()
          this.$http.post('/api/user/address', {
            id: item.id
          }).then(res => {
            this.loading.hide()
            if(this.orderid && (sessionStorage.getItem('siyj-orderaddressid'+this.orderid) == item.id)) {  // 如果删除了当前订单所选的地址，则对应清空订单重新选择的地址
                    sessionStorage.removeItem('siyj-orderaddressid'+this.orderid)
                    sessionStorage.removeItem('siyj-orderaddressname'+this.orderid)
                    sessionStorage.removeItem('siyj-orderaddresstel'+this.orderid)
                    sessionStorage.removeItem('siyj-orderaddressaddress'+this.orderid)
            }
          this.list.splice(index, 1)
           this.$message.success('删除成功')
          }).catch(err => {
            this.loading.hide()

            this.$message.error('删除失败，请重试')

          })

        },
      //  设置默认地址
      setDefault(item) {

          this.loading.show()
          this.$http.post('/api/user/address', {
            id: item.id
          }).then(res => {
            this.loading.hide()
           // this.$message.success('设置成功')
           for(let k in this.list) {
              if(this.list[k].isDefault && this.list[k].id != item.id) {
                this.list[k].isDefault = false
              }
           }

          }).catch(err => {
            this.loading.hide()
            this.$message.error('设置失败，请重试')
            item.isDefault = false
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
    padding: 15px 0 0 10px;
    &:last-child {
      border-bottom: 10px solid #eaeaea;
    }
    .name, .tel {
      display: inline-block;
      margin-right: 20px;
      line-height: 22px;
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
