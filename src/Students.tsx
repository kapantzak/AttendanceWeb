import * as React from 'react';
// import { DefaultTable } from './Helpers/DefaultTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as students from './Models/Students';

let getStudents = ():students.IStudent[] => {
    return [
        {
            ID: 0,
            FirstName: 'John',
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
                    <BootstrapTable data={studentsCollection}>
                        <TableHeaderColumn dataField='ID' isKey={ true }>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='FirstName'>First Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='LastName'>Last Name</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}

export default Students;