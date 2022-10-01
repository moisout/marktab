<script setup lang="ts">
import { BookmarkTreeNode } from '@/types/browser';
import { getDomain } from '@/utilities/getDomain';

const { bookmark } = defineProps<{
  bookmark: BookmarkTreeNode;
}>();
</script>

<template>
  <a class="bookmark" :href="bookmark.url">
    <img
      class="bookmark-image"
      :src="`https://suspicious-lavender-chimpanzee.faviconkit.com/${getDomain(
        bookmark.url,
      )}`"
    />
    <item-title :title="bookmark.title" />
  </a>
</template>

<style lang="scss">
.bookmark {
  text-decoration: none;
  color: #fff;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  .bookmark-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 50px;
    box-sizing: border-box;
  }
}
</style>
