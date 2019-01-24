<template>
  <el-table
    v-loading="isLoading"
    :data="students"
    stripe
    style="width: 100%"
    empty-text="データがありません"
    @cell-click="clickCell">
    <el-table-column
      prop="attendance_num"
      align="center">
    </el-table-column>
    <el-table-column
      prop="name"
      align="center">
    </el-table-column>
    <!-- 時間割　-->
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

  </el-table>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop } from 'vue-property-decorator';
  //import studentsJsonData from '@/mocks/get_students_response.json';
  //import timetableJsonData from '@/mocks/get_timetable_response.json';
  import { Student, AttendanceBookEntry } from '@/models';
  import {attendanceBookModule} from '@/store/attendance-book';

  @Component
  export default class AttendanceBookTable extends Vue {
    @Prop(String) public date!: string;
    private studentsIndexMap: {[key: string]: number} = {} ;
    public beforeMount() {
      /*const len = this.timetableData.timetable.length;
      for (const student of studentsJsonData) {
        this.studentsData.push(Object.assign(student, {attendance_status:  new Array<number>(len).fill(0)}))
      }*/
    }

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
      }
    }

    get isLoading() {
      return attendanceBookModule.isLoading;
    }
    get students() {
      const entry = attendanceBookModule.attendanceBook[this.date];
      if (entry !== undefined) {
        console.log("update")
        const studentsIndexMap:{[key: string]: number} = {};
        entry.students.forEach((x, index) => {
          studentsIndexMap[x.id] = index;
        })
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