<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="bookmark-title-container">
    <p class="bookmark-title">
      {{ title }}
    </p>
  </div>
</template>

<style lang="scss">
.bookmark-title-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #33323c);
  padding: 25px 10px 15px 10px;
  box-sizing: border-box;

  .bookmark-title {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
