<template>
  <div class="doc-list">
    <div class="new-item">
      <el-button type="primary" @click="handleNewDoc">新建文档</el-button>
    </div>
    <div
      class="list-item"
      :class="{ active: curDoc.id === item.id }"
      v-for="item in list"
      :key="item.id as any"
      @click="handleChangeDoc(item.id)"
    >
      <p class="title" v-if="!isEditting || item.id !== curDoc.id">
        {{ item.title }}
      </p>
      <el-input
        class="title"
        v-if="isEditting && item.id === curDoc.id"
        type="textarea"
        v-model="item.title"
        @blur="handleBlur"
      />
      <div class="editor iconfont" @click="isEditting = true">&#xe621;</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doc } from "@/store";
import { onMounted, ref } from "vue";
const props = defineProps<{
  list: Doc[];
  curDoc: Doc;
  handleChangeDoc: (id: any) => void;
  handleNewDoc: () => void;
  handleSave: () => Promise<any>;
  updateList: () => Promise<any>;
}>();

const isEditting = ref(false);
const originTitle = ref(props.curDoc.title);
const handleBlur = async () => {
  if (originTitle.value !== props.curDoc.title) {
    await props.handleSave();
    await props.updateList();
  }
  isEditting.value = false;
};

onMounted(() => {
  console.log(props.list);
});
</script>

<style lang="less" scoped>
.doc-list {
  width: 200px;
  position: relative;
  background-color: #fff;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .list-item {
    width: 80%;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;
    margin: 10px 0;
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    background-color: #bebebe0a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
    .title {
      white-space: wrap;
      word-break: break-all;
      width: 80%;
    }
    .editor {
      float: right;
    }
  }
  .active {
    box-shadow: unset;
    background-color: rgb(244, 245, 247);
    font-size: 16px;
  }
  .new-item {
    position: sticky;
    width: 100%;
    height: 40px;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
    .el-button {
      width: 80%;
    }
  }
}
</style>
