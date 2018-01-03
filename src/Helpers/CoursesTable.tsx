import * as React from 'react';
import * as bsTbl from 'react-bootstrap-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as coursesMod from './../Models/Courses';

interface IProps {
    data: coursesMod.ICourse[];
    rowSelectionHandler: any
}
interface IState {}

const options = {};

export class CoursesTable extends React.Component<IProps, IState> {

    render() {  
        const selectRowProp: bsTbl.SelectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: this.props.rowSelectionHandler
        };
        return (
            <div className="mod-students-table-holder">
                <BootstrapTable data={this.props.data} selectRow={selectRowProp} insertRow={false} deleteRow={false} options={options} striped hover condensed>
                    <TableHeaderColumn dataField="ID" isKey={true} width="80" className="text-center" columnClassName="text-center">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="Title">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="Descr">Description</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}