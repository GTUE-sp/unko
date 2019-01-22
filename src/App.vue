<template>
  <el-table
    :data="studentsData"
    stripe
    style="width: 100%"
    empty-text="読み込み中..."
    @cell-click="clickCell">
    <el-table-column
      prop="attendance_number"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      align="center">
    </el-table-column>
    <!-- 時間割　-->
    <el-table-column
        v-for="(subject, index) of timetableData.timetable"
        :key="subject+'-'+index"
        :label="String(index)"
        header-align="center">
      <el-table-column
        :label="subject"
        header-align="center"
        align="center">
          <template slot-scope="scope" v-if="scope.row.attendance_status[index] === 1">
            <span> / </span>
        </template>-->
      </el-table-column>
    </el-table-column>

  </el-table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import {
    State,
    Getter,
    Action,
    Mutation
  } from 'vuex-class'
  import studentsJsonData from '@/mocks/get_students_response.json';
  import timetableJsonData from '@/mocks/get_timetable_response.json';

  interface Student {
    id: string;
    name: string;
    attendance_number: string;
    attendance_status: number[];
  }

  interface Timetable {
    timetable: string[];
  }

  @Component({})
  export default class App extends Vue {
    public studentsData: Student[] = [];
    public timetableData: Timetable = timetableJsonData;
    public beforeMount() {
      const len = this.timetableData.timetable.length;
      for (const student of studentsJsonData) {
        this.studentsData.push(Object.assign(student, {attendance_status:  new Array<number>(len).fill(0)}))
      }
    }

    public clickCell(row: Student, _: any, cell: HTMLTableCellElement) {
      const index = cell.cellIndex - 2;
      if (index >= 0) {
        const newValue = row.attendance_status[index] === 0 ? 1 : 0;
        row.attendance_status.splice(index, 1, newValue);
      }
    }
  }
</script>