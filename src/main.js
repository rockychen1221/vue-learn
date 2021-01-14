import Vue from 'vue';
import { Tree, MessageBox } from 'element-ui';
import Antd from "ant-design-vue";

import App from './App.vue';

import router from "./router";


Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.use(Tree);
Vue.use(Antd);

Vue.config.productionTip = false

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
