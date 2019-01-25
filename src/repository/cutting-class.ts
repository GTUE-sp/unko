import { Student} from '@/models/cutting-class';
import axios from 'axios';

type GetStudentsResponse = Array<{student_id: string, attendance_num: string, name: string}>;
type GetCuttingClassResponse = number[][];

export async function fetchCuttingClassCount(start: string, end: string) {
    const formData = new FormData();
    formData.append('start', start);
    formData.append('end', start);
    //const getStudentsResult = await axios.get('http://localhost:8000/get_students_response.json');
    const getStudentsResult = await axios.get('http://localhost:8000/getStudent.php');
    //const getCuttingClassResult = await axios.get('http://localhost:8000/get_cutting_response.json');
    const getCuttingClassResult = await axios.post('http://localhost:8000/calc.php', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
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