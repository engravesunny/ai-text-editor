<template>
  <div class="editor-page">
    <doc-list
      :list="docList"
      :curDoc="curDoc"
      :handleChangeDoc="handleChangeDoc"
      :handleNewDoc="handleNewDoc"
      :handleSave="handleSave"
      :updateList="updateList"
    ></doc-list>
    <umo-editor @changed="handleChanged" ref="editorRef"></umo-editor>
  </div>
</template>

<script setup lang="ts">
import { docStore } from "@/store";
import DocList from "./components/doc-list.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const foucs = ref(false);
const editorRef = ref();
const setContent = (content: any) => {
  editorRef.value.setContent(content);
};
const setTitle = (title: any) => {
  editorRef.value.setDocument({ title });
};
const timer = ref<any>(null);
const handleChanged = () => {
  if (timer.value) return;
  foucs.value = true;
  timer.value = setTimeout(() => {
    foucs.value = false;
    timer.value = null;
  }, 5100);
};
const {
  docList,
  updateList,
  curDoc,
  handleChangeDoc,
  handleNewDoc,
  handleSave,
} = docStore();
const route = useRoute();
onMounted(async () => {
  await updateList();
  console.log(route.query.docid);
  curDoc.value =
    docList.value.find((doc) => doc.id == route.query.docid) || curDoc.value;
});
const id = computed(() => {
  return curDoc.value.id;
});

onMounted(() => {
  setInterval(() => {
    if (!foucs.value) return;
    const content = editorRef.value.getHTML();
    curDoc.value.content = content;
    editorRef.value.saveContent();
  }, 5000);
});
const router = useRouter();
watch(id, () => {
  setContent(curDoc.value.content);
  setTitle(curDoc.value.title);
  router.push({
    query: {
      docid: id.value,
    },
  });
});
</script>

<style lang="less" scoped>
.editor-page {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
