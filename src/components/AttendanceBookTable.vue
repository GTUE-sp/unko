<template>
  <el-table
    v-loading="isLoading"
    :data="students"
    stripe
    style="width: 100%"
    empty-text="データがありません"
    @cell-click="clickCell"
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
        v-for="(subject, index) of timetable"
        :key="subject+'-'+index"
        :label="String(index)"
        header-align="center">
      <el-table-column
        :label="subject"
        header-align="center"
        align="center">
          <template slot-scope="scope" v-if="scope.row.status[index] === 1">
            <span> / </span>
          </template>
      </el-table-column>
    </el-table-column>
    <el-table-column
      label="備考"
      header-align="center"
      min-width="300"
      >
        <template slot-scope="scope">
            <el-input
              placeholder="入力してください（任意）"
              v-model="scope.row.remarks"
              clearable
              autosize>
            </el-input>

        </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  import { Student, AttendanceBookEntry } from '@/models';
  import {attendanceBookModule} from '@/store/attendance-book';

  @Component
  export default class AttendanceBookTable extends Vue {
    @Prop(String) public date!: string;
    @Prop(Number) public tableHeight!: number;
    private studentsIndexMap: {[key: string]: number} = {} ;

    public clickCell(row: Student, _: any, cell: HTMLTableCellElement) {
      const cellIndex = cell.cellIndex;
      if (cellIndex >= 2) {
        const studentIndex = this.studentsIndexMap[row.id];
        const subjectIndex = cellIndex - 2;
        attendanceBookModule.SET_ATTENDANCE_STATUS({
          date: this.date,
          studentIndex,
          subjectIndex,
          status: row.status[subjectIndex] === 0 ? 1 : 0
        });
      } else {
        const studentIndex = this.studentsIndexMap[row.id];
        const subjectIndex = 0;
        // TODO: 
        attendanceBookModule.SET_ATTENDANCE_STATUS({
          date: this.date,
          studentIndex,
          subjectIndex,
          status: row.status[subjectIndex] === 0 ? 1 : 0
        });
      }
    }

    get isLoading() {
      return attendanceBookModule.isLoading;
    }
    get students() {
      const entry = attendanceBookModule.attendanceBook[this.date];
      if (entry !== undefined) {
        const studentsIndexMap: {[key: string]: number} = {};
        entry.students.forEach((x, index) => {
          studentsIndexMap[x.id] = index;
        });
        this.studentsIndexMap = studentsIndexMap;
        return entry.students;
      }
      return [];
    }

    get timetable() {
      const entry: AttendanceBookEntry = attendanceBookModule.attendanceBook[this.date];
      if (entry !== undefined) {
        return entry.timetable;
      }
      return [];
    }

  }
</script>