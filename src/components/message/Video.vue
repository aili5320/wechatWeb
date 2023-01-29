<template>
  <div class="video-box">
    <div>
      <video
        class="video-background"
        tabindex="-1"
        muted="muted"
        ref="localCameraVideo"
      ></video>
      <video
        class="video-background"
        tabindex="-1"
        muted="muted"
        ref="remoteCameraVideo"
      ></video>
    </div>

    <div class="box">
      <i class="tops iconfont icon-scale" @click="goBack"></i>
      <div class="pic">
        <div class="picBox">
          <img :src="friPic" alt="" />
        </div>
      </div>
      <div class="msg">
        <p class="name">{{ friRealname }}</p>
        <p class="tip">等待对方接受邀请...</p>
      </div>

      <div class="option">
        <div class="item">
          <i class="iconfont icon-maikefeng"></i>
          <span>麦克风已开</span>
        </div>
        <div class="item" @click="goBack">
          <i class="iconfont icon-guaduan" style="color: red"></i>
          <span>挂断</span>
        </div>
        <div class="item">
          <i class="iconfont icon-24gf-volumeCross"></i>
          <span>扬声器已关</span>
        </div>
      </div>
    </div>
    <audio
      style="display: none"
      src="@/assets/mp3/视频挂断.mp3"
      ref="upMp3"
    ></audio>
    <audio
      v-show="false"
      src="@/assets/mp3/拨号音效.mp3"
      loop
      ref="callMp3"
    ></audio>
  </div>
</template>

<script>
import { sendSock } from "@/utils/socket";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Video",
  props: ["resultFlg"],
  watch: {
    resultFlg: function (val) {
      if (!val) {
        this.$router.go(-1);
      }
    },
  },
  data() {
    return {
      userId: "",
      sendId: "",
      realName: "",
      friRealname: "",
      friPic: "",
      userPic: "",
      answerFlag: null,
      userMedia:null,
      sendMedia:null
    };
  },
  async mounted() {
    if (this.answerFlag=="true") {
      this.$refs.callMp3.play();
     let userMedia = await this.getUserMedia({
        audio: true,
        video: { facingMode: "user" },
      })

      this.$refs.localCameraVideo.srcObject = userMedia;
      this.$refs.localCameraVideo.play();
      // .then((userMedia) => {
      //   //通过video对象的srcObject 赋值userMedia 就能预览到画面
      //   this.$refs.localCameraVideo.srcObject = userMedia;
      //   this.$refs.localCameraVideo.play();
      // });
      let list = {
        userId: this.userId,
        sendId: this.sendId,
        realName: this.realName,
        userPic: this.userPic,
        friRealname: this.friRealname,
        mediaFlag: true,
        mediaType: "video",
      };
      const sendData = {
        sendId: this.sendId,
        mediaType: "video",
        sendMessage: list,
      };
      sendSock(JSON.stringify(sendData));
    } else {
      
      console.log("接听了");
    }
  },
  methods: {
    goBack() {
      this.$refs.localCameraVideo.pause();
      this.$refs.upMp3.play();
      setTimeout(() => {
        this.$router.go(-1);
      }, 500);
    },
    getUserMedia(constrains) {
      if (window.navigator.mediaDevices.getUserMedia) {
        return window.navigator.mediaDevices.getUserMedia(constrains);
      } else if (window.navigator.webkitGetUserMedia) {
        return window.navigator.webkitGetUserMedia(constrains);
      } else if (window.navigator.mozGetUserMedia) {
        return window.navigator.mozGetUserMedia(constrains);
      } else if (window.navigator.getUserMedia) {
        return window.navigator.getUserMedia(constrains);
      }
    },
  },
  created() {
    this.sendId = this.$route.query.sendId;
    this.friRealname = this.$route.query.friRealname;
    this.friPic = this.$route.query.friPic;
    this.realName = this.$route.query.realName;
    this.userId = this.$route.query.userId;
    this.userPic = this.$route.query.userPic;
    this.answerFlag = this.$route.query.answerFlag;
  },
};
</script>

<style lang="less" scoped>
.video-box {
  position: relative;
  height: 100vh;
  background-color: #c1cff7;
  /*进行视频裁剪*/
  overflow: hidden;
}

.video-box .video-background {
  position: absolute;
  left: 50%;
  top: 50%;
  /*保证视频内容始终居中*/
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  /*保证视频充满屏幕*/
  object-fit: cover;
  min-height: 800px;
}
.box {
  overflow: hidden;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #cec4c4, #edeaf1, #e1eefd);

  .tops {
    position: absolute;
    left: 5%;
    top: 3%;
    font-weight: 600;
    font-size: 25px;
  }
  .pic {
    width: 4rem;
    height: 4rem;
    margin: 20% auto;
    position: relative;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
      25px 40px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
      inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    transition: 0.5s;
    .picBox {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      left: 18%;
      top: 20%;
      overflow: hidden;
      border-radius: 50%;
      transition: 0.5s;
    }
  }
  .pic:hover {
    width: 4.5rem;
    height: 4.5rem;
  }

  .pic:hover > .picBox {
    left: 22%;
    top: 25%;
  }

  .msg {
    position: relative;
    color: #1e1e1e;
    font-size: 20px;
    text-align: center;
    .name {
      font-weight: 600;
      letter-spacing: 3px;
    }
    .tip {
      margin-top: 6rem;
      text-align: center;
      font-size: 15px;
      font-weight: 600;
    }
  }

  .option {
    width: 100%;
    max-height: 5rem;
    display: flex;
    position: absolute;
    bottom: 1.5rem;
    flex-flow: row wrap;
    justify-content: flex-start;
    .item {
      // height: 3rem;
      // width: 3rem;
      border-radius: 8px;
      width: calc((100% - 40px) / 3);
      font-size: 18px;
      text-align: center;
      i {
        font-size: 35px;
        width: 2rem;
        height: 2rem;
        color: #1e1e1e;
        line-height: 2rem;
        display: block;
        box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
          15px 10px 10px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
          inset -20px -20px 25px rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        // transition: 0.5s;
      }
      i:first-child {
        margin-left: 35px;
      }
      span {
        display: inline-block;
        font-size: 16px;
        font-weight: 600;
        margin: 15px 0 0 31px;
      }
    }
  }
}
</style>