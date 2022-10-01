<script setup lang="ts">
import { BookmarkTreeNode } from '@/types/browser';

const { bookmarks } = defineProps<{
  bookmarks: BookmarkTreeNode[];
}>();

onMounted(() => {
  console.log(bookmarks);
});

const selectedTab = ref(0);
const selectedTabContent = computed(() => bookmarks[selectedTab.value]);
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
  <bookmark-tab-content :bookmarks="selectedTabContent" />
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
    transition: background-color 150ms ease-in-out;
    box-sizing: border-box;
    user-select: none;

    &:hover {
      background-color: #4b4a53;
    }

    &:active {
      background-color: #4b4a53b1;
    }

    &.selected {
      background-color: #666570;
    }
  }
}
</style>
