<template lang="html">
    <a v-link="`/user/${this.repo.owner.login}/repos/${this.repo.name}`"
        class="repo-item"
    >
        <repo-content :repo="repo"></repo-content>
    </a>
</template>

<script>
import RepoContent from './RepoContent';
export default {
    props: ['repo'],
    components: {
        RepoContent
    }
}
</script>

<style lang="less">
.repo-item {
  border-radius: 6px;
  background-color: #ffffff;
  border: solid 0.5px #e5e5e5;
  margin-bottom: 5px;
  display: block;
  text-decoration: none !important;
  overflow: hidden;
}
</style>
