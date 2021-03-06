import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as students from './../Models/Users';

interface IProps {
    data: students.IUser[]
}
interface IState {}

const options = {};

export class StudentsTable extends React.Component<IProps, IState> {    
    render() {
        return (
            <div className="mod-students-table-holder">
                <BootstrapTable data={this.props.data} insertRow={false} deleteRow={false} options={options} striped hover condensed>
                    <TableHeaderColumn dataField="ID" isKey={true} width="80" className="text-center" columnClassName="text-center">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="FirstName">First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="LastName">Last Name</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}