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
.el-table th> .cell {
  writing-mode: tb-rl; 
	writing-mode: vertical-rl;
	margin: 0 auto;
	white-space: nowrap;
	width: 2em;
	line-height: 1em;
	text-orientation: upright;
}
</style>
