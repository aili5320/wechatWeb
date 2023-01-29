import Recorder from "js-audio-recorder";
import { uploadVoice } from "@/utils/api";
let recorder = null;
let duration = 0;

async function sendVoice() {
  // 发送语音包
  recorder.pause();
  //  let timer = null;
  let formData = new FormData();
  let blob = recorder.getWAVBlob();
  let newbolb = new Blob([blob], { type: "audio/wav" });
  let fileOfBlob = new File([newbolb], new Date().getTime() + ".wav");
  formData.append("file", fileOfBlob);
  duration = Math.ceil((new Date() - duration) / 1000);
  if(duration>60){
   return null;
  }
  const voice = await uploadVoice(formData);
  return {time:duration,vo:voice}
}
function voiceSta() {
  //实例化语音对象
  recorder = new Recorder({
    sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1, // 声道，支持 1 或 2， 默认是1
  });
  //记录开始录音的时间
  duration = new Date();
  Recorder.getPermission().then(
    () => {
      console.log("开始录音");
      recorder.start(); // 开始录音
    },
    (error) => {
      console.log(`${error.name} : ${error.message}`);
    }
  );
}
function handleStop() {
  console.log("停止录音");
  recorder.stop(); // 停止录音
  // mation = false;
}
function handlePlay() {
  console.log("播放录音");
  this.recorder.play(); // 播放录音
  // this.handleDestroy()
}
function handleDestroy() {
  console.log("销毁实例");
  if (this.recorder) {
    this.recorder.destroy(); // 毁实例
  }
}
export { sendVoice, voiceSta, handleStop, handleDestroy, handlePlay };
