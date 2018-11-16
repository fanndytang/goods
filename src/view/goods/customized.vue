<!-- 个性定制 -->
<template>
  <div>
    <head-bar title="个性定制" :menu="true"></head-bar>

    <div class="list-item">
      <div class="label">定制照片</div>
      <input type="file">
    </div>

    <div class="list-item">
      <div class="label">定制字体</div>
      <select>
        <option value="1">宋体</option>
        <option value="2">微软雅黑</option>
        <option value="3">楷体</option>
        <option value="4">华文行楷</option>
      </select>
    </div>

    <div class="list-item">
      <div class="label">定制数量</div>
      <input type="number">
    </div>

    <div class="list-item">
      <div class="label">定制备注</div>
      <textarea cols="30" rows="3"></textarea>
    </div>

    <button type="button">提交订单</button>
  </div>
</template>

<style lang="less" scoped>
  .list-item {
    display: flex;
    padding: 10px;
    .label {
      margin-right: 10px;
      white-space: nowrap;
    }
    textarea {
      flex: 1;
    }
  }

  button {
    position: fixed;
    bottom: 0;
    width: 100vw;
    line-height: 3rem;
    border: none;
    color: #fff;
    background: red;
  }
</style>
