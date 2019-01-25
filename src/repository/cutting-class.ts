import { Student} from '@/models/cutting-class';
import axios from 'axios';

type GetStudentsResponse = Array<{student_id: string, attendance_num: string, name: string}>;
type GetCuttingClassResponse = number[][];

export async function fetchCuttingClassCount(start: string, end: string) {
    const getStudentsResult = await axios.get('http://localhost:8000/get_students_response.json');
    const getCuttingClassResult = await axios.get('http://localhost:8000/get_cutting_response.json');
    const studentsResponse: GetStudentsResponse = getStudentsResult.data;
    const cuttingClassResponse: GetCuttingClassResponse = getCuttingClassResult.data;
    const students: Student[] = studentsResponse.map((x, index) => {
        return {
            name: x.name,
            attendance_number: x.attendance_num,
            id: x.student_id,
            cutting_class_count: cuttingClassResponse[index][12],
            absent_class_count: cuttingClassResponse[index][10],
            late_class_count: cuttingClassResponse[index][11],
        }
    })
    return students;
}