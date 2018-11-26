<!-- 个性定制 -->
<template>
  <div>
    <head-bar title="个性定制" :menu="true"></head-bar>

    <div class="box">
      <div class="bg"></div>

      <div class="list-item">
        <div class="label">定制照片 <small>请上传图片</small></div>
        <upload-img-1></upload-img-1>
      </div>

      <div class="list-item">
        <div class="label">定制字体</div>
        <form-select style="width: 64vw;"></form-select>
      </div>

      <div class="list-item">
        <div class="label">定制数量</div>
        <form-number></form-number>
      </div>

      <div class="list-item">
        <div class="label">定制备注</div>
        <div class="remark">
          <textarea cols="30" rows="3" placeholder="请输入您的详细要求"></textarea>
        </div>
      </div>
    </div>

    <button class="btn btn-block btn-red btn-sub" type="button">提交订单</button>

    <foot-bar></foot-bar>
  </div>
</template>

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
    padding: 5px 0 10px 0;
    margin-left: 12px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    .upload {
      margin: 6px 0 10px 0;
    }
    .label {
      white-space: nowrap;
      line-height: 34px;
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
    margin: 20px auto;
    border-radius: 10px;
  }

  .form-number {

  }
</style>
