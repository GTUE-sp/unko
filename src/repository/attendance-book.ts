import {  AttendanceBookEntry, Student} from '@/models/attendance-book';
import axios from 'axios';

type GetStudentsResponse = Array<{student_id: string, attendance_num: string, name: string}>;
interface GetTimetableResponse {
    id: string;
    day_of_week: string;
    timetable: string[];
}
type GetCuttingClassResponse = number[][];

export async function fetchAttendanceBookEntry(date: string) {
    const formData = new FormData();
    formData.append('start', date);
    formData.append('end', date);
    const getStudentsResult = await axios.get('http://localhost:8000/get_students_response.json');
    const getTimetableResult = await axios.get('http://localhost:8000/get_timetable_response.json');
    const getCuttingClassResult = await axios.post('http://localhost:8000/get_cutting_response.json', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    const timetableResponse: GetTimetableResponse = getTimetableResult.data;
    timetableResponse.timetable.push('');
    const studentsResponse: GetStudentsResponse = getStudentsResult.data;
    const cuttingClassResponse: GetCuttingClassResponse = getCuttingClassResult.data;
    const students: Student[] = studentsResponse.map((x, index) => {
        return {
            name: x.name,
            attendance_number: x.attendance_num,
            id: x.student_id,
            status: cuttingClassResponse[index].slice(1, 10),
            remarks: '',
        };
    });
    const entry: AttendanceBookEntry = {
        timetable: timetableResponse.timetable,
        students,
    };
    return entry;

}
// TODO:
export async function postAttendanceBookEntry(date: string, entry: AttendanceBookEntry) {
    for (const student of entry.students) {
        const formData = new FormData();
        formData.append('student_id', student.id);
        formData.append('absent_day', date);
        student.status.forEach((status, index) => {
            formData.append(`class${index}`, status.toString());
        });
        formData.append('remarks', student.remarks);
        /*await axios.post('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });*/
    }
}