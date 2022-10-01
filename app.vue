<script setup lang="ts">
const { data: bookmarksToolbar } = useGetBookmarksTree();
</script>

<template>
  <div class="main">
    <div class="main-container" v-if="bookmarksToolbar">
      <BookmarkTabs :bookmarks="bookmarksToolbar" />
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

p {
  margin: 0;
}

.main {
  height: 100%;
  width: 100%;
  display: flex;
  color: #fff;
  font-family: 'Noto Sans', sans-serif;

  .main-container {
    margin: 200px auto auto auto;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
