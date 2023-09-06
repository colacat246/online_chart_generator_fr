import { ref } from 'vue';

const show = ref(false);
const infoContent = ref('');
const infoType = ref('success');

let timeout;

function setInfo({ content, type, stay }) {
  if (timeout) clearTimeout(timeout);

  infoContent.value = content;
  if (type) {
    infoType.value = type;
  } else {
    infoType.value = 'success';
  }
  show.value = true;
  // 是否长期显示
  if (stay) {
    return;
  }
  timeout = setTimeout(() => {
    show.value = false;
  }, 2500);
}

function clearInfo() {
  if (timeout) clearTimeout(timeout);
  show.value = false;
}

export default function useInfoAlert() {
  return { show, infoContent, infoType, setInfo, clearInfo };
}
