<script setup lang="ts">
const { data: bookmarksTree } = useGetBookmarksTree();

const bookmarksToolbar = computed(
  () =>
    bookmarksTree.value?.children?.find(el => el?.id?.includes('toolbar'))
      ?.children ?? [],
);
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
  background-color: #2b2a33;
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
