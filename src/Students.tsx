import * as React from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as students from './Models/Students';
import { StudentsTable } from './Helpers/StudentsTable';

let getStudents = (): students.IStudent[] => {
    return [
        {
            ID: 0,
            FirstName: 'John',
            LastName: 'Doe'
        },
        {
            ID: 1,
            FirstName: 'Mary',
            LastName: 'Doe'
        }
    ];
};

let studentsCollection: students.IStudent[] = getStudents();

class Students extends React.Component {
    render() {
        return (
            <div>
                <h2>Students</h2>
                <p>This is the students list page</p>
                <div>
                    <StudentsTable data={studentsCollection} />                    
                </div>
            </div>
        );
    }
}

export default Students;