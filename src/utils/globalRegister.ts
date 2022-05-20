
/*
require.context函数接受三个参数
directory {String} -读取文件的路径
useSubdirectories {Boolean} -是否遍历文件的子目录
regExp {RegExp} -匹配文件的正则
* */

//注册包中的组件
export default function register(vue:any,context:any) {

  const pathList = []
    //遍历拿到所有的文件名称
  for (const path in context) {
    pathList.push(path)
  }

  pathList.forEach((path) => {
    const component = context[path].default
    vue.component(component.name, component)
  })

}
