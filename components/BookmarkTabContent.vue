<script setup lang="ts">
import { BookmarkTreeNode } from '@/types/browser';

const { bookmarks } = defineProps<{
  bookmarks: BookmarkTreeNode;
}>();
</script>

<template>
  <div class="bookmark-tab-content">
    <div
      class="bookmark-tab-content-child"
      v-for="bookmark in bookmarks?.children.filter(
        el => el.type !== 'separator',
      )"
      :key="bookmark.id"
    >
      <bookmark v-if="bookmark.type === 'bookmark'" :bookmark="bookmark" />
      <folder-preview v-if="bookmark.type === 'folder'" :bookmark="bookmark" />
    </div>
  </div>
</template>

<style lang="scss">
.bookmark-tab-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 25px;
  margin: 25px 0 0 0;

  .bookmark-tab-content-child {
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
    background-color: #33323c;
    text-decoration: none;
    color: #fff;
    display: block;
    width: 150px;
    height: 150px;
    overflow: hidden;
  }
}
</style>
