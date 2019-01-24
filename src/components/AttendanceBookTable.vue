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


  function getClassIndex(date: Date) {
    const threshold = 2700000;
    const classRangeTable = [
      [[0, 0, 0], [8, 59, 59]],
      [[9, 10, 0], [9, 54, 59]],
      [[9, 55, 0], [10, 39, 59]],
      [[10, 50, 0], [11, 34, 59]],
      [[11, 35, 0], [12, 19, 59]],
      [[13, 5, 0], [13, 49, 59]],
      [[13, 50, 0], [14, 34, 59]],
      [[14, 45, 0], [15, 29, 59]],
      [[15, 30, 0], [16, 14, 59]],
      [[16, 15, 0], [23, 59, 59]],
    ];
    date.setMilliseconds(0);
    let index = 0;
    for (const range of classRangeTable) {
      const start = new Date(date.getTime());
      start.setHours(range[0][0]);
      start.setMinutes(range[0][1]);
      start.setSeconds(range[0][2]);

      const end = new Date(date.getTime());
      end.setMilliseconds(0);
      end.setHours(range[1][0]);
      end.setMinutes(range[1][1]);
      start.setSeconds(range[1][2]);

      if (
        date.getTime() - start.getTime() >= 0 &&
        end.getTime() - date.getTime() <= threshold
      ) {
        break;
      }
      index++;
    }
    return index;
  }
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