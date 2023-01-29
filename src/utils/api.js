import axios from "./https"

// 登录
export function login(loginInfo){
  return axios.post("/api/login",loginInfo)
}

export function send(Info){
  return axios.post("/api/login",Info)
}

export function getVerify(){
  return axios.post("/api/getVerify")
}

export function upUserPic(formData){
  return axios.post("/upload/uploadUserPic",formData)
}

export function register(userInfo){
  return axios.post("/api/register",userInfo)
}

export function queryUser(info) {
  return axios.post("/api/queryUser",info)
}

export function verifyUsername(username){
  return axios.post("/api/verifyUsername",username)
}

export function addFriend(friendInfo){
  return axios.post("/api/addFriend",friendInfo)
}

export function queryFriendList(Info){
  return axios.post("/api/queryFriendList",Info)
}

export function passFriend(Info){
  return axios.post("/api/passFriend",Info)
}



export function updatePicUrl(info){
  return axios.post("/api/updatePicUrl",info)
}


export function friendList(friendInfo){
  return axios.post("/api/friendList",friendInfo)
}


export function uploadVoice(formData){
  return axios.post("/upload/uploadVoice",formData)
}

export function upPic(formData){
  return axios.post("/upload/upPic",formData)
}