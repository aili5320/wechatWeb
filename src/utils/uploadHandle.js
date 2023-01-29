import { upPic } from "@/utils/api";
export function picHandle(e) {
  let files = e.target.files;
      if(files[0]==null) return;
      if (/.jpeg|.bmp|.png|.JPEG|.jpg|.webp/.test(files[0].name)) {
        const reader = new FileReader(); // 创建读取文件对象
        reader.readAsDataURL(files[0])
        reader.onload = function() { // 文件读取完成后
							// 读取完成后，将结果赋值给img的src
							// that.fileImg =  this.result;
              // that.picFlag = false;
						};
        //上传后台的图片数据 
        let formData = new FormData();
        formData.append("file", files[0]);
        return upPic(formData)
       
      } else {
        return null;
      }
}