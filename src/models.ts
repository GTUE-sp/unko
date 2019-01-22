
interface Student {
    name: string;
    attendance_num: string;
    student_id: string;
    attendance_status: number[];
  }
  
  interface TimeTable {
    timetable: string[];
    studnts: Student[];
    //day: 
  }