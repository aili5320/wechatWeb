<template>
  <div class="register">
    <div class="title">
      <van-icon name="arrow-left" class="arrow" @click="goBlack" />
    </div>
    <div class="pic" @click.stop="uploadBtn">
      <input
        ref="uploadInp"
        type="file"
        id="uploadImage"
        @change="(e) => handleUpload(e)"
        style="display: none"
      />

      <div class="picBox">
        <img :src="fileImg" alt="" />
        <b>上传头像</b>
      </div>
    </div>
    <div class="userInfo">
      <form>
        <div class="inputBox">
          <input
            type="text"
            v-model.number="username"
            placeholder="用户名或手机号"
            maxlength="11"
          />
        </div>
        <div class="inputBox">
          <input type="test" v-model="realName" placeholder="昵称" maxlength="20"/>
        </div>
        <div class="inputBox">
          <input type="password" v-model="password" placeholder="密码" />
        </div>
        <div class="inputBox">
          <input type="password" v-model="conPassword" placeholder="确认密码" />
        </div>
        <div class="inputBox" @click="verifyBtn">
          <input
            type="text"
            v-model="verify"
            placeholder="验证码"
            maxlength="6"
          />
          <div class="verify">
            <img :src="verifyImg" alt="" />
          </div>
        </div>
        <div class="inputBox">
          <div class="submit" @click="submit">注册</div>
        </div>
      </form>
    </div>
    <a href="">
      <b>已有账户？</b>
      立即登录</a>
  </div>
</template>

<script>
import { getVerify, upUserPic ,register,verifyUsername } from "@/utils/api";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      realName:"",
      conPassword: "",
      verify: "",
      verifyImg: "",
      verifyText: "",
      formData: {},
      fileImg:{}
    };
  },
  methods: {
    // 头像上传
   async uploadPic() {
    return await upUserPic(this.formData)
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
						};
        //上传后台的图片数据 
        let fData = new FormData();
        fData.append("file", files[0]);
        this.formData = fData
      } else {
        this.$notify({ message: "请上传图片文件", background:"transparent" ,color:"skyblue"});
      }
    },
    uploadBtn() {
      this.$refs.uploadInp.click();
    },
    goBlack() {
      this.$router.go(-1);
    },
   async submit() {
      if (this.password != this.conPassword)
        return this.$notify({ message: "两次输入的密码不一致！", background:"transparent" ,color:"skyblue"});
        if(this.username == "")
        return this.$notify({ message: "账户不能为空！", background:"transparent" ,color:"skyblue"});
        if (this.realName == "")
        return this.$notify({ message: "昵称不能为空！", background:"transparent" ,color:"skyblue"});
        const data ={"username":this.username} 
        const flag = await verifyUsername(data);
        if(flag!=0) return this.$notify({ message: "该账户已被使用！", background:"transparent" ,color:"skyblue"});
        if(this.verify != this.verifyText)
        return this.$notify({ message: "验证码输入错误！", background:"transparent" ,color:"skyblue"});
        
      // 上传头像
      let userPic = await this.uploadPic();
      const req = {
        "username":this.username,
        "password":this.password,
        "realNam":this.realName,
        "userPic":userPic
      }
      const result = await register(req)  
      if (result == 0) {
        this.$router.push("/");
        return this.$notify({ message: "注册成功！", background:"transparent" ,color:"skyblue"});
      }
    },
    async verifyBtn() {
      const result = await getVerify();
      this.verifyImg = result.verifyImg;
      this.verifyText = result.verifyText;
      console.log(this.verifyText);
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #cec4c4, #edeaf1, #e1eefd);
  .title {
    width: 100%;
    height: 1.5rem;
    position: relative;
    i {
      position: absolute;
      font-size: 25px;
      left: 0.5rem;
      top: 0.5rem;
    }
  }
  .pic {
    width: 4rem;
    height: 4rem;
    margin: 0 auto;
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
      b {
        line-height: 2.5rem;
        font-size: 18px;
        color: #757575;
        margin-left: 12px;
        // text-align: center;
      }
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

  .pic::before {
    content: "";
    position: absolute;
    top: 30px;
    left: 25px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #ffffff;
    opacity: 0.9;
    z-index: 99;
  }
  .userInfo {
    margin-top: 20px;
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      align-items: center;
      .inputBox {
        position: relative;
        width: 225px;
        box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
          inset -2px -5px 10px rgba(255, 255, 255, 1),
          15px 15px 10px rgba(0, 0, 0, 0.05),
          15px 10px 15px rgba(0, 0, 0, 0.025);
        border-radius: 25px;
        transition: 0.5s;
        input {
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          font-size: 20px;
          padding: 10px 15px;
        }
        .verify {
          position: absolute;
          top: 10px;
          right: 10px;
          height: 40px;
          width: 90px;
          overflow: hidden;
        }
      }
      .inputBox::before {
        content: "";
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 65%;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
      }
      .submit {
        color: #fff;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        letter-spacing: 15px;
        font-weight: 600;
        background: transparent;
        width: 100%;
        font-size: 20px;
        padding: 10px;
      }

      .inputBox:last-child {
        width: 120px;
        background-color: #01b4ff;
        box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
          15px 15px 10px rgba(0, 0, 0, 0.05),
          15px 10px 15px rgba(0, 0, 0, 0.025);
      }
      .inputBox:hover {
        width: 80%;
      }
    }
  }
  a {
    position: absolute;
    bottom: 20px;
    left: 30%;
    font-size: 14px;
    color: #ccc;
    font-weight: 600;
    b {
      color: #b3b3b3;
    }
  }
}
</style>