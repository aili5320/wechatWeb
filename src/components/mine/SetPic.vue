<template>
  <div class="center">
    <div class="title">
      <van-icon name="arrow-left" @click="goBack" />
      <span>个人头像</span>
      <van-icon name="ellipsis" class="arrow" @click="showShare = true" />
    </div>

    <div class="pic">
      <img v-if="picFlag" src="@/assets/images/userPic.jpg" alt="" />
      <img v-if="!picFlag" :src="fileImg" alt="" />
    </div>

    <div class="pic" @click.stop="uploadBtn">
      <input
        ref="uploadInp"
        type="file"
        id="uploadImage"
        @change="(e) => handleUpload(e)"
        style="display: none"
      />
      <!-- <div class="picBox">
        <img :src="fileImg" alt="" />
        <b>上传头像</b>
      </div> -->

     

    </div>

    <input type="file" ref="takeInp" @change="(e) => handleUpload(e)" style="display: none" accept="image/*" capture="camera">
    <van-overlay :show="showShare"  >
      <div class="operate" >
       <div @click="uploadBtn">选择相册</div> 
       <div @click="takeBtn">拍照</div> 
       <div @click="uploadPic">保存</div>
       <div @click="sabolish">取消</div>
    </div>
    </van-overlay>
    
  </div>
</template>

<script>
import { upUserPic } from "@/utils/api";
export default {
  name: "setPic",
  data() {
    return {
      showShare: false,
      fileImg:{},
      formData: {},
      picFlag:true,
    };
  },
  methods: {
    sabolish(){
     this.showShare =false
     this.picFlag=true
     this.formData = null
    },

    async uploadPic() {
      
      if (this.formData !=null) {
        const result =  await upUserPic(this.formData)
        // const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        // console.log(111111111);
        // console.log(userInfo.userId);
        // const req = {
        //   picUrl:result,
        //   userId:userInfo.userId
        // }
        // const updataUrl =  await updatePicUrl(req)
        // console.log(updataUrl);
        console.log(result);
        this.showShare =false
      }
    },

   /*显示上传头像*/
   handleUpload(e) {
      let files = e.target.files;
      if(files[0]==null) return;
      if (/.jpeg|.bmp|.png|.JPEG|.jpg|.webp/.test(files[0].name)) {
        const that = this;
        const reader = new FileReader(); // 创建读取文件对象
        reader.readAsDataURL(files[0])
        reader.onload = function() { // 文件读取完成后
							// 读取完成后，将结果赋值给img的src
							that.fileImg =  this.result;
              that.picFlag =false;
						};
        //上传后台的图片数据 
        let fData = new FormData();
        fData.append("file", files[0]);
        this.formData = fData
      } else {
        this.$notify({message: "请上传图片文件",background:"transparent",color:"skyblue"})
      }
    },
    takeBtn(){
      this.$refs.takeInp.click();
    },
    uploadBtn() {
      this.$refs.uploadInp.click();
    },
    goBack() {
      this.$router.go(-1);
    },
    showBtn() {
      this.showShare = true;
    },
  },
};
</script>

<style lang="less" scoped>
.center {
  min-height: 100vh;
  background-color: #111;

  .title {
    width: 100%;
    height: 1.5rem;
    position: relative;
    color: #fff;
    span {
      position: absolute;
      left: 40%;
      top: 0.5rem;
      text-align: center;
      font-size: 20px;
    }
    i {
      position: absolute;
      font-size: 25px;
      left: 0.5rem;
      top: 0.5rem;
    }
    .arrow {
      position: absolute;
      right: 0.5rem;
      left: 90%;
    }
  }
  .pic {
    margin-top: 40%;
  }

  .operate {
    position: absolute;
    border-radius: 15px 15px 0 0;
    bottom: 0;
    width: 100%;
    height: 7rem;
    background-color: #fff;
    display: flex;
    flex-flow: column wrap;
    div {
      flex: 1;
      z-index: 999;
      font-size: 20px;
      font-weight: 500;
      text-align: center;
      line-height: 1.5rem;
      border-bottom: 1px solid #ededed;
    }
    div:active {
      background-color: #ededed;
    }
  }
}
</style>