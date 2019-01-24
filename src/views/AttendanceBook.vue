<template>
  <AttendanceBookTable :date="date"></AttendanceBookTable>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { Student, AttendanceBookEntry } from "@/models"
  import AttendanceBookTable from '@/components/AttendanceBookTable.vue';
  import {attendanceBookModule} from '@/store/attendance-book';

  @Component({components: {AttendanceBookTable}})
  export default class AttendanceBook extends Vue {
    public date: string = '2019-01-23';
    public mounted() {
      const entry = attendanceBookModule.attendanceBookEntry(this.date);
      if (entry === undefined) {
        attendanceBookModule.fetchAttendanceBook(this.date);
      }
    } 
  }
</script>