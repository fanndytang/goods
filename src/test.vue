<template>
  <div>
    <img src="../static/img/ad1.jpg" id="image" alt="" width="100%">
  </div>
</template>

<script>
  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs';


  export default {
    mounted () {
      const image = document.getElementById('image');
      console.log(image)
      const cropper = new Cropper(image, {
        ready() {
          console.log('ready')
          // Do something here
          // ...

          // And then
          // this.cropper.crop();
        },
        autoCrop: true,
       // viewMode:1,
        aspectRatio: 16 / 9,
        crop(event) {
          console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);
          console.log(event.detail.rotate);
          console.log(event.detail.scaleX);
          console.log(event.detail.scaleY);
        },
      });
    }
  }
</script>
