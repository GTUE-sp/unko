<template>
  <el-table
    v-loading="isLoading"
    :data="students"
    stripe
    border
    style="width: 100%"
    empty-text="データがありません"
    :max-height="tableHeight">
    <el-table-column
      prop="attendance_number"
      align="center"
      width="50"
      fixed>
    </el-table-column>
    <el-table-column
      prop="name"
      label="氏名"
      align="center"
      min-width="200"
      fixed>
    </el-table-column>
    <el-table-column
      label="欠課"
      align="center"
      prop="cutting_class_count"
      >
    </el-table-column>
    <el-table-column
      label="遅刻"
      align="center"
      prop="late_class_count"
      >
    </el-table-column>
    <el-table-column
      label="欠席"
      align="center"
      prop="absent_class_count"
      >
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { cuttingClassModule} from '@/store/cutting-class';

  @Component
  export default class AttendanceBookTable extends Vue {
    @Prop(Number) public tableHeight!: number;

    get isLoading() {
      return cuttingClassModule.isLoading;
    }
    get students() {
      return cuttingClassModule.students;
    }
  }
</script>