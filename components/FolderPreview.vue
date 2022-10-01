<script setup lang="ts">
import { BookmarkTreeNode } from '@/types/browser';
import { getDomain } from '@/utilities/getDomain';

const { bookmark } = defineProps<{
  bookmark: BookmarkTreeNode;
}>();

const iconCount = computed(() => {
  if (bookmark.children?.length > 9) {
    return 9;
  }
  return bookmark.children?.length;
});
</script>

<template>
  <div class="folder-preview">
    <div class="folder-preview-icons">
      <img
        class="folder-preview-icon"
        v-for="i in iconCount"
        :src="`https://suspicious-lavender-chimpanzee.faviconkit.com/${getDomain(
          bookmark.children[i]?.url,
        )}`"
      />
    </div>
    <item-title :title="bookmark.title" />
  </div>
</template>

<style lang="scss">
.folder-preview {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  cursor: pointer;

  .folder-preview-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    backdrop-filter: blur(10px);
  }

  .folder-preview-icons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;

    .folder-preview-icon {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
