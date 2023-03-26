import { createApp } from 'vue';
import '@/normalize.css';
import '@/style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from '@/App.vue';
import router from '@/routes/index.js';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { v4 as uuidv4 } from 'uuid';

const app = createApp(App);

// 全局函数，组件中使用getCurrentInstance().appContext.config.globalProperties访问
// app.config.globalProperties.$blurBtn = (evt) => {
//   // 按钮失焦
//   evt.target.blur();
//   if (evt.target.nodeName === 'SPAN') {
//     evt.target.parentNode.blur();
//   }
// };

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
app.provide('genNewName', (namePrefix, arrForCompare) => {
  let name = namePrefix;
  let count = 1;
  // 空验证
  if (!arrForCompare) return name;
  while (arrForCompare.some((i) => i.$extra.name === name)) {
    name = `${namePrefix}（${++count}）`;
  }
  return name;
});
app.mount('#app');
