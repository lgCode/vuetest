/**
 * @description 单个组件导出
 * @param
 * @author lg
 * @date 2021-06-07 22:02:44
 */

// 导入组件，组件必须声明 name
import gSelect from "./src/index";

// 为组件添加 install 方法，用于按需引入
gSelect.install = function(Vue) {
  Vue.component(gSelect.name, gSelect);
};

export default gSelect;
