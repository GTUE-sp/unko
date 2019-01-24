<template>
  <AttendanceBook></AttendanceBook>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import AttendanceBook from '@/views/AttendanceBook.vue';

  @Component({components: {AttendanceBook}})
  export default class App extends Vue {
  }
</script>

<style lang="css">
  body {
    margin: 0px;
    height: 100%;
  }

  html {
    height: 100%;
  }
  .el-table__header tr:nth-child(2) th > .cell {
    writing-mode: tb-rl; 
    writing-mode: vertical-rl;
    margin: 0 auto;
    white-space: nowrap;
    width: 2em;
    line-height: 1em;
    text-orientation: upright;
  }
</style>
