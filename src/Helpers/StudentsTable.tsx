import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as students from './../Models/Students';

interface IProps {
    data: students.IStudent[];
}
interface IState {

}

function onAfterInsertRow(row: any) {
    let newRowStr = '';
    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
    }
    alert('The new row is:\n ' + newRowStr);
}

function onAfterDeleteRow(rowKeys: any) {
    alert('The rowkey you drop: ' + rowKeys);
}

const options = {
    afterInsertRow: onAfterInsertRow,
    onAfterDeleteRow: onAfterDeleteRow
};

export class StudentsTable extends React.Component<IProps, IState> {    
    render() {        
        return (
            <div className="mod-students-table-holder">
                <BootstrapTable data={this.props.data} insertRow={true} deleteRow={true} selectRow={{mode:"checkbox"}} options={options} striped hover condensed>
                    <TableHeaderColumn dataField="ID" isKey={true} width="80" className="text-center" columnClassName="text-center">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="FirstName">First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="LastName">Last Name</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}