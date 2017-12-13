import * as React from 'react';
// import * as $ from 'jquery';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as students from './Models/Students';
import { StudentsTable } from './Helpers/StudentsTable';

let getStudents = (): students.IStudent[] => {
    // $.ajax({
    //     url: 'http://localhost:24940/api/Students'
    // });
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

// let headers: Headers = new Headers();
// headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm9obiIsImVtYWlsIjoiIiwiZXhwIjoxNTE0MDEzMTAyLCJuYmYiOjE1MTMxNDkxMDIsImlzcyI6IkF0dGVuZGFuY2VXZWJBUEkiLCJhdWQiOiJBdHRlbmRhbmNlQXBwQ29uc3VtZXIifQ.Ii7s9UW-beOPsEmPeOUxBC9U96aYY2-s4CZag_U7LIE");

// fetch("http://localhost:24940/api/Students", {
//     method: "post",
//     headers: headers
// }).then(response => response.json).then(json => console.log(json));

//fetch("https://postman-echo.com/time/now").then(response => response.json).then(json => console.log(json));

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