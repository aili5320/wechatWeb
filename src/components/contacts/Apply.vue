<template>
  <div class="center">
    <div class="title">
      <van-icon name="arrow-left" class="arrow" @click="goBlack" />
      <span>申请添加好友</span>
    </div>
    <div class="send" @click="addBtn">发送</div>
    <div class="apply">
      <span class="tip">发送添加好友申请</span>
      <textarea class="tex" v-model="apply" style="overflow: hidden"></textarea>
    </div>

    <div class="remark">
      <span class="tip">设置备注</span>
      <input v-model="remark" />
    </div>

    <div class="row">
      <span class="tip">添加标签与描述</span>
      <div class="item">
        <div class="first">
          标签
          <van-icon name="arrow" />
        </div>
        <div>
          描述
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="row">
      <span class="tip">设置朋友权限</span>
      <div class="item">
        <div class="first">
          聊天、朋友圈、微信运动
          <van-icon name="checked" />
        </div>
        <div>仅聊天</div>
      </div>
    </div>

    <div class="row">
      <span class="tip">朋友圈和状态</span>
      <div class="item">
        <div class="first">不让他(她)看</div>
        <div>不看他(她)</div>
      </div>
    </div>
  </div>
</template>

<script>
import  { addFriend } from "@/utils/api"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Apply",
  data() {
    return {
      searchUser: {},
      userInfo:{},
      apply: "",
      remark: "",
    };
  },
  methods: {
    goBlack() {
      this.$router.go(-1);
    },
   async addBtn() {
      if (this.searchUser != null) {
        const req = {
          userInfo : this.userInfo,
          searchUser: this.searchUser,
          apply:this.apply,
          remark:this.remark
        };
      const result  = await addFriend(req);
      if(result == 1){
        this.$notify({ message: "申请成功！", background:"transparent" ,color:"skyblue"});
        return this.$router.push("/contacts")
      } else if(result == 2){
        this.$notify({ message: "该用户已是您的好友!", background:"transparent" ,color:"skyblue"});
        return this.$router.push("/contacts")
      }else{
        this.$notify({ message: "申请失败！", background:"transparent" ,color:"skyblue"});
      }
      } 
      
    },
  },
  created() {
    this.searchUser = this.$route.query.searchUser;
     this.userInfo = JSON.parse(localStorage.getItem("userInfo")); 
     this.apply = "我是" + this.userInfo.realName;
  },
};
</script>

<style lang="less" scoped>
.center {
  min-height: 100vh;
  .title {
    width: 100%;
    height: 1.5rem;
    position: relative;
    text-align: center;
    i {
      position: absolute;
      font-size: 25px;
      top: 0.5rem;
      left: 0.5rem;
    }
    span {
      font-size: 22px;
      font-weight: 600;
    }
  }
  .send {
    position: fixed;
    bottom: 15px;
    z-index: 999;
    left: 30%;
    height: 1.2rem;
    width: 4rem;
    color: #fff;
    font-size: 25px;
    text-align: center;
    line-height: 1.2rem;
    font-weight: 500;
    letter-spacing: 3px;
    border-radius: 10px;
    background-color: #2ba245;
  }
  .apply {
    margin-top: 0.2rem;
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
    span {
      font-size: 18px;
      text-align: left;
    }
    .tex {
      background-color: #ededed;
      border-radius: 10px;
      padding: 15px 10px;
      width: 95%;
      height: 2.5rem;
      font-size: 20px;
    }
  }

  .remark {
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
    span {
      font-size: 18px;
      text-align: left;
    }
    input {
      background-color: #ededed;
      border-radius: 10px;
      padding: 15px 10px;
      width: 95%;
      height: 1rem;
      font-size: 20px;
    }
  }
  .row {
    width: 90%;
    border-radius: 10px;
    overflow: hidden;
    margin: 0 auto;
    span {
      font-size: 18px;
      text-align: left;
    }
    .item {
      border-radius: 10px;
      div {
        background-color: #ededed;
        width: 80%;
        padding: 15px 10px;
        width: 95%;
        height: 0.8rem;
        font-size: 20px;
        position: relative;
        i {
          position: absolute;
          right: 0.5rem;
        }
      }
      .first {
        border-bottom: 1px solid #e0e0e0;
      }
    }
  }
}
</style>