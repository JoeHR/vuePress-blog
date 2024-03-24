/**
 * @name 饶恒
 * @Date 2023-06-13 16:01:48
 * @introduction 将file文件转位 DataURL
 * @description 将file文件转为 字符串URL
 * @param {参数类型} file 文件对象
 * @param {参数类型} cb 回调函数
 * @return {返回类型说明}
 * @exception [违例类型] [违例类型说明]
 */
export function fileToDataURL(file,cb=()=>{}){
  return new Promise((resolve,reject)=>{
    if(file && Object.prototype.toString.call(file) === '[object File]'){
      const reader = new FileReader()
      reader.onload = e=>{
        if(cb && typeof cb === 'function'){
          cb&&cb(e.target)
        }
        resolve(e.target.result)
      }
      reader.readAsDataURL(file)
    }else{
      reject('错误：请传入file文件')
    }
  })
}
