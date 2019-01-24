<template>
<el-container>
  <el-header>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="日付を選択してください"
      format="yyyy/MM/dd"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions">
    </el-date-picker>
  </el-header>
  <el-main>
    <CuttingClassTable :date="date" :tableHeight="tableHeight"></CuttingClassTable>
  </el-main>
</el-container>

  
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { Student, AttendanceBookEntry } from '@/models/attendance-book'
  import CuttingClassTable from '@/components/CuttingClassTable.vue';
  import {cuttingClassModule} from '@/store/cutting-class';


  // tslint:disable-next-line:variable-name
  function formatDate(date: Date, format: string) {
    format = format.replace(/YYYY/g, date.getFullYear().toString());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    return format;
};
  @Component({components: {CuttingClassTable}})
  export default class AttendanceBook extends Vue {
    public date = formatDate(new Date(), 'YYYY-MM-DD');
    public tableHeight = window.innerHeight;
    public pickerOptions = {
      disabledDate(time: Date) {
        return time.getTime() > Date.now();
      },
      shortcuts: [{
        text: 'Today',
        onClick(picker: any) {
          picker.$emit('pick', new Date());
        },
      }, {
        text: 'Yesterday',
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          picker.$emit('pick', date);
        }
      }, {
        text: 'A week ago',
        onClick(picker: any) {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', date);
        },
      }],
    };
    public mounted() {
      this.handleWindowResize();
      window.addEventListener('resize', this.handleWindowResize.bind(this));
      if (cuttingClassModule.students.length === 0) {
        cuttingClassModule.fetchAttendanceBookEntry("", "");
      }
    }

    public beforDestroy() {
      window.addEventListener('resize', this.handleWindowResize.bind(this));
    }

    @Watch('date')
    public onDateChange(val: string, oldValue: string) {
      /*const entry = attendanceBookModule.attendanceBook[this.date];
      if (entry === undefined) {
        attendanceBookModule.fetchAttendanceBookEntry(this.date);
      }*/
    }
    
    private handleWindowResize() {
      const dummyContets = document.querySelector('.el-main') as Element;
      this.tableHeight = dummyContets.clientHeight;
    }
  }
</script>

<style lang="css" scoped>
.el-container {
  height: 100%;
}
.el-main {
  padding: 0px;
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  width: 100%;
}
</style>
