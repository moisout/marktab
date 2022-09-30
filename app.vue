<script setup lang="ts">
import { mockdata } from '@/data/mockdata';
import { BookmarkTreeNode } from './types/browser';

const bookmarksTree = ref<BookmarkTreeNode>();

const bookmarksToolbar = computed(
  () =>
    bookmarksTree.value?.children?.find(el => el?.id?.includes('toolbar'))
      ?.children ?? []
);

onMounted(async () => {
  if (window?.browser) {
    const bookmarksTreeValue = await window.browser.bookmarks.getTree();
    bookmarksTree.value = bookmarksTreeValue[0];
  } else {
    bookmarksTree.value = mockdata[0] as BookmarkTreeNode;
  }
});
</script>

<template>
  <div class="main">
    <div class="main-container">
      <bookmark-tabs :bookmarks="bookmarksToolbar" />
    </div>
  </div>
</template>

<style lang="scss">
html,
body,
#__nuxt {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #1e1e1e;
}
.main {
  height: 100%;
  width: 100%;
  display: flex;
  color: #fff;
  font-family: 'Noto Sans', sans-serif;

  .main-container {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
