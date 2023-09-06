import { createApp } from 'vue';
import '@/normalize.css';
import '@/style.less';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from '@/App.vue';
import router from '@/routes/index.js';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { v4 as uuidv4 } from 'uuid';
import { VueCookies } from 'vue-cookies';
import { AxiosError } from 'axios';

import useInfoAlert from '@/composables/infoAlert';
const { setInfo } = useInfoAlert();

const app = createApp(App);

// 全局函数，组件中使用getCurrentInstance().appContext.config.globalProperties访问
// app.config.globalProperties.$blurBtn = (evt) => {
//   // 按钮失焦
//   evt.target.blur();
//   if (evt.target.nodeName === 'SPAN') {
//     evt.target.parentNode.blur();
//   }
// };

// 错误处理
app.config.errorHandler = (err, instance, info) => {
  console.warn('from vue error handler:');
  if (err instanceof AxiosError) {
    console.log(err);
    setInfo({
      content: '接口请求失败',
      stay: true,
      type: 'warn',
    });
    return;
  }
  throw err;
};

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);

const pinia = createPinia();
app.use(pinia);

// 按钮失焦
app.provide('blurBtn', (evt) => {
  evt.target.blur();
  if (evt.target.nodeName === 'SPAN') {
    evt.target.parentNode.blur();
  }
});
// 生成Id
app.provide('genUuid', () => {
  return uuidv4();
});
// 计算新名称
app.provide('genNewName', (namePrefix, arrForCompare, propReflect) => {
  let name = namePrefix;
  let count = 1;
  // 空验证
  if (!arrForCompare) return name;
  while (arrForCompare.some((i) => propReflect(i) === name)) {
    name = `${namePrefix}（${++count}）`;
  }
  return name;
});

app.config.globalProperties.$cookies = VueCookies;
app.mount('#app');
