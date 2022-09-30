<script setup lang="ts">
  import { BookmarkTreeNode } from '@/types/browser';

const { bookmarks } = defineProps<{
  bookmarks: BookmarkTreeNode[];
}>();

const selectedTab = ref(0);
</script>

<template>
  <div class="bookmark-tabs">
    <div
      class="bookmark-tab"
      :class="{ selected: selectedTab === index }"
      @click="selectedTab = index"
      v-for="(bookmarkTab, index) in bookmarks"
    >
      {{ bookmarkTab.title }}
    </div>
  </div>
  <div class="bookmark-tab-content">
    
  </div>
</template>

<style lang="scss">
.bookmark-tabs {
  display: flex;
  flex-direction: row;
  gap: 15px;

  .bookmark-tab {
    padding: 10px 15px;
    border-radius: 25px;
    border: solid 1px #666570;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    box-sizing: border-box;

    &:hover {
      background-color: #4b4a53;
    }

    &.selected {
      background-color: #666570;
    }
  }
}
</style>
