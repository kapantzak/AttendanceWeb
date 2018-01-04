import * as React from 'react';
import * as bsTbl from 'react-bootstrap-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'reactstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as coursesMod from './../Models/Courses';

interface IProps {
    data: coursesMod.ICourse[];
    qrCodeGenerator: any
}
interface IState {}

export class CoursesTable extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);        
        this.cellButton = this.cellButton.bind(this);
    }

    cellButton(cell: any, row: any, enumObject: any, rowIndex: number) {
        return <Button color="success" onClick={() => {this.props.qrCodeGenerator(row);}}>QR code</Button>
    }

    render() {
        const options = {};
        const selectRowProp: bsTbl.SelectRow = {
            mode: 'none',
            clickToSelect: true,
            onSelect: this.props.qrCodeGenerator
        };
        return (
            <div className="mod-students-table-holder">
                <BootstrapTable data={this.props.data} selectRow={selectRowProp} insertRow={false} deleteRow={false} options={options} striped hover condensed>                    
                    <TableHeaderColumn dataField="ID" isKey={true} width="80" className="text-center" columnClassName="text-center">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="Title">Title</TableHeaderColumn>
                    <TableHeaderColumn dataField="Descr">Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="button" width="150px" dataFormat={this.cellButton}></TableHeaderColumn>                    
                </BootstrapTable>
            </div>
        );
    }
}