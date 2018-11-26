<template>
  <div>
    <head-bar :back="true" title="收货地址">
      <router-link class="text-primary f14" to="/editaddress">添加新地址</router-link>
    </head-bar>

    <div class="list" v-for="item,i in list" :key="i">
      <span class="name">{{item.name}}</span>
      <span class="tel">{{item.tel}}</span>
      <div class="address">{{item.address}}</div>
      <div class="bar">
        <div class="flex">
          <span class="check-box"><input name="defaultAddress" type="radio" :checked="item.isDefault"><span class="icon"></span> 设为默认</span>
        </div>
        <img class="del" height="22px" :src="require('@/assets/icons/icon_del.png')" alt="" @click="list.splice(i,1)">
        <img class="edit" height="22px" :src="require('@/assets/icons/icon_edit.png')" alt="" @click="$router.push({name: 'editaddress', query: {id: item.id}})">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
      data () {
          return {
              list: [
                {id: '1', name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: true},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
              ]
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
