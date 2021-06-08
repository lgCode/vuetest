/**
 * @description 以组件库的形式导出
 * @param
 * @author lg
 * @date 2021-06-08 10:08:09
 */

import gSelect from "./gSelect/index";

// 以数组的结构保存组件，便于遍历
const components = [gSelect];

//定义 install 方法 , 接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  install.installed = true;

  //遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component);
  });
};

// 判断是否是直接引入文件 ,是则auto install

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  //导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  //组件列表
  ...components
};
