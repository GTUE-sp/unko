<template>
  <el-table
    :data="studentsData"
    stripe
    style="width: 100%"
    @cell-click="clickCell">
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
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
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
  export default class Table extends Vue {
    public studentsData: Student[] = [];
    public timetableData: Timetable = timetableJsonData;
    public beforeMount() {
      const len = this.timetableData.timetable.length;
      for (const student of studentsJsonData) {
        this.studentsData.push(Object.assign(student, {attendance_status:  new Array<number>(len).fill(0)}))
      }
      this.studentsData[0].attendance_status[1] = 1
    }

    public destroyed() {
      //this.attendance = {};
    }
    public clickCell(row: Student, column: any, cell: HTMLTableCellElement, event: any) {
      const index = cell.cellIndex - 1;
      const newValue = row.attendance_status[index] === 0 ? 1 : 0;
      row.attendance_status.splice(index, 1, newValue);
    }
  }
</script>