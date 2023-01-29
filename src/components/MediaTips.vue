<template>
  <div>
    <div class="mediaTip">
      <div class="picBox">
        <img :src="media.userPic" alt="">
      </div>
      <span>{{ media.realName }}</span>
      <span class="tips">邀请你视频通话..</span>
      <div class="icon">
        <i class="iconfont icon-guaduan " @click="hungUp"></i>
      </div>
      <div class="icon right">
      <i class="iconfont icon-shexiangtou_shiti " @click="answer"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { sendSock } from "@/utils/socket";
export default {
 props:{
  media:{
    typeof: Object,
    default:""
  }
 },
 data(){
  return {
    mediaFlag:false,
    userInfo:null,
  }
 },
 methods:{
  hungUp(){
    this.$emit("mediaFlag",this.mediaFlag);
    const list = {
      mediaFlag:false,
      mediaType:"video",
    };
    const sendData ={
      sendId:this.media.userId,
      mediaType:"video",
      sendMessage:list
    }
    sendSock(JSON.stringify(sendData))
  },
  answer(){
    this.$emit("mediaFlag",this.mediaFlag);
    this.$router.push({path:'/video',query:{
          userId:this.userInfo.userId,
          realName: this.userInfo.realName,
          userPic: this.userInfo.userPic,
          friRealname:this.media.realName,
          friPic:this.media.userPic,
          sendId:this.media.userId,
          answerFlag:false,
        }})
  }
 },
 created(){
  this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
 }
}
</script>

<style lang="less" scoped>
 .mediaTip {
  position: fixed;
  width: 95%;
  height: 2.5rem;
  top: .5rem;
  left: 2%;
  overflow: hidden;
  z-index: 999;
  color: #fff;
  border-radius: 15px;
  background: rgba(0, 0, 0, .6);
  backdrop-filter: blur(5px);
  .picBox {
    position: absolute;
    left: .5rem;
    top: .5rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 8px;
    overflow: hidden;
  }
  span {
    position:absolute;
    left: 2.5rem;
    top: .5rem;
    font-size: 18px;
  }
  .tips {
    font-size: 14px;
    top:1.2rem;
    color: #a9a9a9;
  }
  .icon {
    position: absolute;
    right: 2rem;
    top: .5rem;
    height: 1.2rem;
    width: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    border-radius: 50%;
    background-color: #f75855;
    i {
      font-size: 20px;
    }
  }
  .right {
    background-color: #49c265;
    right: .5rem;
  }
}

</style>