import { apiDoclist, continueWrite, save, summary, translate2English } from '@/service/apis/doc'
import { ref } from 'vue';

export type Doc = { id: string | null; title: string; content: string; }
const saving = ref(false);
const curDoc = ref<Doc>({
  id: null,
  content: '',
  title: '',
});
const docList = ref<Doc[]>([]);
export const docStore = () => {
  /**
   * 更新文章列表
   */
  const updateList = async () => {
    const { code, data } = (await apiDoclist()).data as any;
    if (code === 0) {
      docList.value = data;
    }
    if (curDoc.value.id) {
      curDoc.value = docList.value.find(doc => doc.id === curDoc.value.id) || curDoc.value;
    } else {
      curDoc.value = docList.value[0];
    }
  }
  /**
   * 更换到其它文档
   */
  const handleChangeDoc = (id: string) => {
    const doc = docList.value.find(doc => doc.id === id);
    doc && (curDoc.value = doc);
  }
  /**
   * 保存文档
   */
  const handleSave = async (newDoc?: Doc) => {
    console.log('save');
    saving.value = true;
    let flag = false;
    if (newDoc) {
      // 新建文档
      await save(newDoc);
    } else {
      // 保存当前文档
      const res = await save({ ...curDoc.value });
      const { code } = res.data;
      if (code === 0) {
        flag = true;
      }
    }
    saving.value = false;
    return flag;
  }
  /**
   * 新建文档
   */
  const handleNewDoc = async () => {
    let newDoc: Doc = {
      id: null,
      title: '无标题',
      content: ''
    }
    // 新建文档，id为null，save后请求最新列表
    await handleSave(newDoc);
    await updateList();
    curDoc.value = docList.value[docList.value.length - 1];
  }
  /**
   * 续写
   */
  const handleContinueWrite = () => {
    continueWrite({ input: curDoc.value.content }, (progressEvent: ProgressEvent) => {
      console.log(progressEvent);
    })
  }
  /**
   * 摘要
   */
  const handleSummary = () => {
    summary({ input: curDoc.value.content }, (progressEvent: ProgressEvent) => {
      console.log(progressEvent);
    })
  }
  /**
   * 翻译为英文
   */
  const handleTranslate2English = () => {
    translate2English({ input: curDoc.value.content }, (progressEvent: ProgressEvent) => {
      console.log(progressEvent);
    })
  }
  return {
    docList,
    curDoc,
    handleChangeDoc,
    handleSave,
    handleContinueWrite,
    handleSummary,
    handleTranslate2English,
    handleNewDoc,
    updateList
  }
}
