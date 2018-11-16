<template>
  <div>
    <head-bar :back="true" title="收货地址">
      <router-link to="/editaddress">添加新地址</router-link>
    </head-bar>

    <div class="list" v-for="item,i in list" :key="i">
      <span class="name">{{item.name}}</span>
      <span class="tel">{{item.tel}}</span>
      <div class="address">{{item.address}}</div>
      <div class="bar">
        <span class="flex"><input type="checkbox" :checked="item.isDefault"> 设为默认</span>
        <span class="edit fa fa-edit" @click="$router.push({name: 'editaddress', query: {id: item.id}})"></span>
        <span class="del fa fa-trash" @click="list.splice(i,1)"></span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
      data () {
          return {
              list: [
                {id: '1', name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金利1102室', isDefault: true},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金利1102室', isDefault: false},
              ]
          }
      }
  }
</script>

<style lang="less" scoped>
  .list {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px 0 10px;
    line-height: 28px;
    .name {
      display: inline-block;
      margin-right: 20px;
    }
    .bar {
      background: #ccc;
      margin: 0 -10px;
      padding: 0 10px;
      line-height: 40px;
      display: flex;
      align-items: center;
      .flex {
        flex: 1;
      }
      .fa {
        margin-right: 10px;
      }
    }
  }
</style>
