<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

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
  .wrapper {
    height: 100%;
  }
</style>
