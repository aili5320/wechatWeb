<template>
  <div class="container">
    <div class="drop">
      <div class="content">
        <h2>泡泡</h2>
        <form>
          <div class="inputBox">
            <input type="text" v-model="username" placeholder="用户名">
          </div>
          <div class="inputBox">
            <input type="password" v-model="password" placeholder="密码">
          </div>
          <div class="inputBox">
            <div class="submit" @click="submit"  >登录</div>
          </div>
        </form>
      </div>
    </div>
    <a href="#" class="btns">忘记密码</a>
    <router-link class="btns signup" to="/register">注册</router-link>
   </div>
</template>

<script>
import { login } from '@/utils/api'
export default {
   // eslint-disable-next-line vue/multi-word-component-names
   name:'Login',
   data () {
    return {
      username:"",
      password:""
    }
   },
   methods:{
    async submit(){
     if (this.username == "" || this.password == "") return this.$notify({message:"用户名或密码不能为空！", background:"transparent",color:"skyblue"})
      const req = {
        username:this.username,
        password:this.password
      }  
      const result = await login(req);
        // if(result == 1) return  Notify({ message: "用户名错误,请重新填写！", background:"transparent" });
        if(result == 1) return  this.$notify({ message: "用户名错误,请重新填写！", background:"transparent",color:"skyblue" });
        if(result == 2) return  this.$notify({ message: "密码错误,请重新填写", background:"transparent" ,color:"skyblue"});
        if (result != null) {
          localStorage.setItem("userInfo",JSON.stringify(result));
          this.$notify({ message: "登录成功", background:"transparent" ,color:"skyblue"});
          this.$router.push("/message");
        }
    },
   }
}
</script>

<style lang="less" scoped>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins',sans-serif;
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: #cec4c4;
  background-image: linear-gradient(to bottom right , #cec4c4,#edeaf1, #e1eefd);
  block-size: 150%;
}

.container .drop {
  position: relative;
  width: 350px;
  height: 350px;
  box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
  25px 40px 20px rgba(0,0,0,0.05),
  25px 30px 30px rgba(0,0,0,0.05),
  inset -20px -20px 25px rgba(255, 255, 255, 0.9);
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
}
.container .drop:hover {
  border-radius: 50%;
}

.container .drop::before {
  content: '';
  position: absolute;
  top:50px;
  left: 55px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.9;
}

.container .drop::after {
  content: '';
  position: absolute;
  top: 85px;
  left: 85px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.9;
}

.container .drop .content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
  gap: 15px;
}

.container .drop .content h2 {
  position: relative;
  color: #333;
  font-size: 20px;
  margin-top: 10px;
}

.container .drop .content form {
  display: flex;
  flex-direction: column;
  gap:20px;
  justify-content: center;
  align-items: center;
}

.container .drop .content form .inputBox {
  position: relative;
  width: 225px;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
  inset -2px -5px 10px rgba(255, 255, 255, 1),
  15px 15px 10px rgba(0,0,0,0.05),
  15px 10px 15px rgba(0,0,0,0.025);
  border-radius: 25px;
}
.container .drop .content form .inputBox::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 65%;
  height: 5px;
  background:rgba(255, 255, 255, 0.5); 
  border-radius: 5px;
}
.container .drop .content form .inputBox input {
  border:none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 20px;
  padding: 10px 15px;
}

.container .drop .content form .submit {
  color:#fff;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  letter-spacing: 5px;
  font-weight: 600;
  border:none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 20px;
  padding: 10px 15px;
}

.container .drop .content form .inputBox:last-child {
  width: 120px;
  background-color: #ff0f5b;
  box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1),
  15px 15px 10px rgba(0,0,0,0.05),
  15px 10px 15px rgba(0,0,0,0.025);
  transition: 0.5s;
}

.container .drop .content form .inputBox:last-child:hover {
  width: 150px;
}

.btns {
  position: absolute;
  right: 15px;
  bottom: 25px;
  width: 120px;
  height: 120px;
  background-color: #c61dff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  line-height: 1.2em;
  letter-spacing: 0.1em;
  font-size: 20px;
  transition: 0.2s;
  text-align: center;
  box-shadow: inset 10px 10px 10px rgba(190, 1, 255, 0.05),
  15px 25px 10px rgba(190, 1, 255,0.1),
  15px 20px 20px rgba(190, 1, 255,0.1),
  inset -10px -10px 15px rgba(255, 255, 255, 0.5);
  border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%; 
}
.btns::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 30px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.45;
}
.btns.signup {
  top: 30px;
  left: 20px;
  width: 100px;
  height: 100px;
  border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
  background:#01b4ff;
  box-shadow: inset 10px 10px 10px rgba(1, 180, 255, 0.05),
  15px 25px 10px rgba(1, 180, 255, 0.1),
  15px 20px 20px rgba(1, 180, 255, 0.1),
  inset -10px -10px 15px rgba(255, 255, 255, 0.5);
}
.btns.signup::before {
  left: 20px;
  width: 15px;
  height: 15px;
}
.btns:hover {
  border-radius: 50%;
}
</style>