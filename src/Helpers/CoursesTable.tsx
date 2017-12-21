import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as coursesMod from './../Models/Courses';

interface IProps {
    data: coursesMod.ICourse[];
}
interface IState {}

const options = {};

export class CoursesTable extends React.Component<IProps, IState> {    
    render() {  
        console.log(this.props.data);      
        return (
            <div className="mod-students-table-holder">
                <BootstrapTable data={this.props.data} insertRow={false} deleteRow={false} options={options} striped hover condensed>
                    <TableHeaderColumn dataField="ID" isKey={true} width="80" className="text-center" columnClassName="text-center">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="Title">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="Descr">Description</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}