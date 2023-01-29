<template>
  <div class="centent">
    <div class="title">
      <div class="ioc">
        <van-icon name="arrow-left" class="goBlack" @click="goBack" />
        <p>{{ friRealname }}</p>
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="con"></div>
    <div
      class="dialog"
      v-for="(item, index) in msgList"
      :key="index"
      @click="hidden"
      ref="playFlag"
    >
      <div class="msg" v-if="item.type ? false : true">
        <div class="userpic left">
          <img :src="friPic" alt="" />
        </div>
        <div class="arr left1"></div>
        <div
          class="text left2"
          v-cloak
          v-html="item.content"
          v-if="item.content != null"
        ></div>
        <audio
          class="text "
          :src="item.voice"
          controls="controls"
          v-show="false"
        ></audio>
        <div class="text left2 audio audiolf" style="text-align: left;" @click="playOv(index)" v-if="item.voice != null" >
          <i class="iconfont icon-yuyinzuo"></i>
          <span>{{ item.voTime }}''</span>
        </div>

        <img
          class="text left2 imgs"
          :src="item.sendPic"
          alt=""
          v-if="item.sendPic != null"
        />
      </div>
      <div class="msg" v-if="item.type ? true : false">
        <div class="userpic">
          <img :src="userInfo.userPic" alt="" />
        </div>
        <div class="arr"></div>
        <!-- <div class="lightRight"></div> -->
        <div
          class="text"
          v-cloak
          v-html="item.content"
          v-if="item.content != null"
        ></div>
        <audio
          class="text "
          :src="item.voice"
          controls="controls"
          v-show="false"
        ></audio>
        <div class="text audio  " @click="playOv(index)" v-if="item.voice != null" >
          <span>{{ item.voTime }}''</span>
          <i class="iconfont icon-yuyinyou"></i>
        </div>
        <img
          class="text imgs right"
          :src="item.sendPic"
          alt=""
          v-if="item.sendPic != null"
        />
      </div>
    </div>
    <van-loading type="spinner" style="margin-left: 40%;" v-if="!speakFlag" color="#1989fa" />
    
    <div class="symbol" ref="symbol"></div>
    <div class="send" ref="send">
      <van-icon name="volume-o" @click="voiceBtn" v-if="!voiceFlag" />
      <van-icon
        class="iconfont icon-jianpan"
        @click="voiceBtn"
        v-if="voiceFlag"
      />
      <div class="sendInput" v-if="voiceFlag">
        <p
          class="speak"
          v-if="speakFlag"
          @touchstart="gtouchstart()"
          @touchmove="gtouchmove()"
        >
          按住说话
        </p>
        <p class="speak end" v-if="!speakFlag" @touchend="gtouchend()">
          松开结束
        </p>
      </div>
      <input
        class="sendInput"
        v-if="!voiceFlag"
        @keydown="sendDown"
        ref="message"
        v-model="message"
        value="myText"
      />
      <van-icon name="smile-o" @click="emojiBtn" />
      <van-icon name="add-o" @click="optionBtn" />
      <ul class="emojiList" v-if="emojiFlag">
        <li
          v-for="(item, index) in emojis"
          :key="index"
          @click="handleEmoji(item)"
        >
          {{ item.text }}
        </li>
        <span class="emojiSend" @click="sendBtn">发送</span>
      </ul>
      <div class="option" v-if="optionFlag">
        <div class="item" @click="picBtn">
          <i class="iconfont icon-tupian"></i>
          <span>照片</span>
          <input
            ref="uploadpic"
            type="file"
            id="uploadImage"
            @change="(e) => changePic(e)"
            style="display: none"
          />
        </div>
        <div class="item" @click="picBtn">
          <i class="iconfont icon-xiangji"></i>
          <span>拍摄</span>
        </div>
        <div class="item" @click="show = true">
          <i class="iconfont icon-xiangji"></i>
          <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
          <span>视频</span>
        </div>
        <div class="item">
          <i class="iconfont icon-weizhi"></i>
          <span>位置</span>
        </div>
        <div class="item">
          <i class="iconfont icon-hongbao"></i>
          <span>红包</span>
        </div>
        <div class="item">
          <i class="iconfont icon-transfer-fill"></i>
          <span>转载</span>
        </div>
        <div class="item">
          <i class="iconfont icon-maikefeng"></i>
          <span>语言</span>
        </div>
        <div class="item">
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
        </div>
      </div>
    </div>
    <div ref="back"></div>
    <audio v-show="false" src="@/assets/mp3/发送语音.mp3"  ref="voiceMp3"></audio>
  
  </div>
</template>

<script>
import { sendSock } from "@/utils/socket";
import emojiList from "@/utils/emoji";
import { picHandle } from "@/utils/uploadHandle";
import { voiceSta, sendVoice } from "@/utils/voice";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dialog",
  props: ["project"],
  watch: {
    project: function (val) {
      this.msgList = val;
    },
  },
  data() {
    return {
      sendId: "",
      friRealname: "",
      friPic: "",
      userInfo: {},
      message: "",
      msgList: [],
      emojis: [],
      emojiFlag: false,
      optionFlag: false,
      voiceFlag: false,
      voFlag:true,
      voice: "",
      speakFlag: true,
      show: false,
      actions: [{ name: '视频通话' }, { name: '语言通话' }, { name: '取消' }],
      // ---
      // ---
    };
  },
  methods: {
     onSelect(item) {
      this.show = false;
      if (item.name=="取消") {
        this.show = false;
      }
      if (item.name=="视频通话") {
        this.$router.push({path:'/video',query:{
          userId:this.userInfo.userId,
          realName: this.userInfo.realName,
          userPic: this.userInfo.userPic,
          friRealname:this.friRealname,
          friPic:this.friPic,
          sendId:this.sendId,
          answerFlag:true,
        }})
      }
      if (item.name=="语言通话") {
        this.$router.push({path:'/speech',query:{
          userId:this.userInfo.userId,
          realName: this.userInfo.realName,
          userPic: this.userInfo.userPic,
          friRealname:this.friRealname,
          friPic:this.friPic,
          sendId:this.sendId,
        }})
      }
    },
    // 发送图片
    picBtn() {
      this.$refs.uploadpic.click();
    },
    async changePic(e) {
      const sendPic = await picHandle(e);
      if(sendPic==null) return this.$notify({ message: "请选择图片文件", background:"transparent" ,color:"skyblue"});
      let list = {
        type: true,
        time: new Date(),
        content: null,
        voice: null,
        sendPic: sendPic,
        realName: this.userInfo.realName,
        friRealname:this.friRealname,
        friPic:this.friPic,
        userPic: this.userInfo.userPic,
        sendId: this.sendId,
        userId: this.userInfo.userId,
        mediaType:"message"
      };
      var sendData = {
        sendId: this.sendId,
        sendMessage: list,
        mediaType:"message"
      };
      sendSock(JSON.stringify(sendData));
      this.msgList.push(list);
      localStorage.setItem(this.sendId, JSON.stringify(this.msgList));
      this.hidden();
    },
    // 发送语言
    playOv(index){
      let audio = this.$refs.playFlag[index].getElementsByClassName("text")[0]
      if(this.voFlag){
        audio.play();
        this.voFlag=!this.voFlag
      }else {
        audio.load();
        this.voFlag=!this.voFlag
      }
    },
    gtouchstart() {
      this.speakFlag = !this.speakFlag;
      voiceSta();
    },
    gtouchmove() {
      console.log("2，按下并且在移动呢");
    },
    async gtouchend() {
      this.speakFlag = !this.speakFlag;
      const result = await sendVoice();
      if(result==null) return this.$notify({message:"语言不能超过60s", background:"transparent",color:"skyblue"})
      this.voice =result.vo
      const voTime =result.time
      if (voTime >= 60)
        return this.$notify({
          message: "语言不能超过60秒",
          background: "transparent",
          color: "skyblue",
        });
      let list = {
        type: true,
        time: new Date(),
        content: null,
        voice: this.voice,
        voTime:voTime,
        realName: this.userInfo.realName,
        userPic: this.userInfo.userPic,
        friRealname:this.friRealname,
        friPic:this.friPic,
        sendId: this.sendId,
        userId: this.userInfo.userId,
        mediaType:"message"
        
      };
      var sendData = {
        sendId: this.sendId,
        sendMessage: list,
        mediaType:"message"
      };
      sendSock(JSON.stringify(sendData));
      this.msgList.push(list);
      localStorage.setItem(this.sendId, JSON.stringify(this.msgList));
      this.$refs.voiceMp3.play();
    },
    // 显示语言按钮
    voiceBtn() {
      this.voiceFlag = !this.voiceFlag;
      this.optionFlag = false;
      this.emojiFlag = false;
      // this.$refs.send.style.position = "fixed";
      this.$refs.symbol.style.height = "2rem";
    },
    // 隐藏按钮
    hidden() {
      this.optionFlag = false;
      this.emojiFlag = false;
      // this.$refs.send.style.bottom = "0";
      this.$refs.symbol.style.height = "2rem";
    },
    // 显示功能列表
    optionBtn() {
      this.optionFlag = true;
      this.emojiFlag = false;
      // this.$refs.send.style.bottom = "0";
      this.$refs.symbol.style.height = "7rem";
    },
    // 显示表情列表
    emojiBtn() {
      this.voiceFlag =false;
      const emojis = emojiList;
      this.emojis = emojis.map((emoji) => ({ text: emoji }));
      this.emojiFlag = true;
      this.optionFlag = false;
      // this.$refs.send.style.bottom = "3%";
      this.$refs.symbol.style.height = "9rem";
    },
    // 后退
    goBack() {
      this.$router.go(-1);
    },
    // 发送表情
    handleEmoji(item) {
      this.message = this.message + item.text;
    },
    // 按键发送
    sendDown(e) {
      if (this.message == "") return;
      if (e.key == "Enter") {
        this.sendBtn();
      }
    },
    // 点击发送
    sendBtn() {
      if (this.message == "") return;
      let list = {
        type: true,
        time: new Date(),
        content: this.message,
        realName: this.userInfo.realName,
        friPic: this.friPic,
        userPic: this.userInfo.userPic,
        friRealname:this.friRealname,
        sendId: this.sendId,
        userId: this.userInfo.userId,
        mediaType:"message"
      };
      this.msgList.push(list);
      var sendData = {
        sendId: this.sendId,
        sendMessage: list,
        mediaType:"message"
      };
      sendSock(JSON.stringify(sendData));
      localStorage.setItem(this.sendId, JSON.stringify(this.msgList));
      this.message = "";
    },
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.back.scrollIntoView({ behavior: "auto" });
    });
  },
  created() {
    this.sendId = this.$route.query.sendId;
    this.friRealname = this.$route.query.friRealname;
    this.friPic = this.$route.query.friPic;

    
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const list = localStorage.getItem(this.sendId);
    if (list != null) {
      this.msgList = JSON.parse(list);
    }
    this.$nextTick(() => {
      this.$refs.back.scrollIntoView({ behavior: "auto" });
    });
  },
};
</script>

<style lang="less" scoped>
.centent {
  min-height: 100vh;
  background-color: #ededed;
  .title {
    position: relative;
    position: fixed;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 1.8rem;
    background-color: #ededed;
    backdrop-filter: blur(15px);
    .ioc {
      p {
        left: 45%;
        padding: 0 0.1rem;
        height: 50px;
        font-size: 18px;
        font-weight: 600;
        line-height: 60px;
        color: #333;
        letter-spacing: 2px;
        font-size: 18px;
        text-align: center;
      }
      i {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: absolute;
        top: 0.2rem;
        right: 0.5rem;
        font-size: 22px;
        box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        border-radius: 50% 50% 49% 51% / 66% 61% 39% 34%;
      }
      .goBlack {
        position: absolute;
        left: 0.5rem;
      }
    }

    i:hover {
      border-radius: 50%;
    }
  }
  .con {
    width: 100%;
    height: 1rem;
  }
  .dialog {
    width: 100%;
    margin-top: 1rem;
    position: relative;
    .msg {
      margin-top: 1rem;
      width: 100%;
      .userpic {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 5px;
        position: absolute;
        right: 0.5rem;
        overflow: hidden;
      }
      .left {
        left: 0.5rem;
      }
      .arr {
        right: 1.8rem;
        background-color: #a0e871;
        position: absolute;
        top: 0.3rem;
        height: 20px;
        width: 20px;
        z-index: 2;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        border-radius: 21% 79% 76% 24% / 58% 60% 40% 42%;
      }
      .left1 {
        left: 1.7rem;
        background-color: #ededed;
        border-radius: 86% 14% 16% 84% / 58% 60% 40% 42%;
      }
      .text {
        width: 60%;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
        margin-left: 15%;
        font-size: 20px;
        right: 2.2rem;
        display: inline-block;
        padding: 0.2rem;
        border-radius: 8px;
        background-color: #a0e871;
        box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
          10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
          inset -5px -5px 10px rgba(255, 255, 255, 0.5);
      }
      .left2 {
        margin-left: 20%;
        background-color: #ededed;
      }
      .audio {
       height: .8rem;
       text-align: right;
       i {
        margin:0 10px;
        font-size: 20px;
        // font-weight: 600;
       }
      }
      .imgs {
        max-height: 3rem;
        max-width: 3rem;
      }
      .right {
        margin-left: 43%;
      }
    }
  }
  .send {
    position: fixed;
    z-index: 999;
    bottom: 0;
    min-height: 1.5rem;
    width: 100%;
    background-color: #ededed;
    .sendInput {
      display: inline-block;
      width: 60%;
      margin: 0 5px;
      height: 1rem;
      border-radius: 8px;
      vertical-align: middle;
      letter-spacing: 3px;
      font-size: 20px;
      padding: 0.1rem;
      background-color: #ededed;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.05),
        10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
        inset -5px -5px 10px rgba(255, 255, 255, 0.5);
      .speak {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        text-align: center;
        user-select: none;
        font-weight: 500;
      }
      .end {
        background-color: rgb(107, 104, 104);
      }
      .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
      }
    }
    i {
      width: 40px;
      height: 40px;
      margin: 0 2px;
      line-height: 40px;
      text-align: center;
      font-size: 25px;
      box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.05),
        10px 10px 5px rgba(0, 0, 0, 0.05), 10px 10px 5px rgba(0, 0, 0, 0.05),
        inset -5px -5px 10px rgba(255, 255, 255, 0.5);
      border-radius: 50% 50% 49% 51% / 66% 61% 39% 34%;
    }
    i:hover {
      border-radius: 50%;
    }
    .emojiList {
      width: 100%;
      min-height: 7.5rem;
      position: relative;
      li {
        margin: 10px;
        font-size: 25px;
        height: 24px;
        width: 24px;
        display: inline-block;
      }
      .emojiSend {
        position: absolute;
        bottom: 0.1rem;
        right: 0.2rem;
        font-size: 20px;
        color: #fff;
        line-height: 1rem;
        text-align: center;
        font-weight: 500;
        letter-spacing: 2px;
        background-color: skyblue;
        border-radius: 10px;
        height: 1rem;
        width: 2rem;
      }
    }
    .option {
      width: 100%;
      min-height: 5rem;
      display: flex;
      margin-top: 0.5rem;
      flex-flow: row wrap;
      justify-content: flex-start;
      .item {
        height: 2rem;
        border-radius: 8px;
        width: calc((100% - 40px) / 4);
        font-size: 18px;
        i {
          width: 1.5rem;
          height: 1.5rem;
          line-height: 1.5rem;
          display: block;
          text-align: center;
        }
        span {
          text-align: left;
          margin-left: 0.3rem;
          text-align: center;
        }
      }
      .item:nth-of-type(1n + 0) {
        margin-left: 10px;
      }
    }
  }
  .symbol {
    position: relative;
    width: 100%;
    height: 2rem;
    bottom: 0;
    background-color: #ededed;
  }
}
</style>