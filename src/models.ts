
export interface Student {
  name: string;
  attendance_number: string;
  id: string;
  status: number[];
}

export type TimeTable = string[];
export interface AttendanceBookEntry {
    timetable: TimeTable;
    students: Student[];
}
export interface AttendanceBook {[key: string]: AttendanceBookEntry; }