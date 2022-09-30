<script setup lang="ts">
import { BookmarkTreeNode } from '~~/types/browser';

const { bookmarks } = defineProps<{
  bookmarks: BookmarkTreeNode[];
}>();
</script>

<template>
  <div class="bookmark-tabs">
    <div v-for="bookmarkTab in bookmarks">
      {{ bookmarkTab.title }}
    </div>
  </div>
</template>

<style lang="scss">
.bookmark-tabs {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>
