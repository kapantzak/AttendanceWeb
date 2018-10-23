import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as enrollments from './../Models/Enrollments';

interface IProps {
    data: enrollments.IEnrollment[]
}
interface IState {}

const options = {
    expandRowBgColor: '#344861'
};

class LogsTable extends React.Component<IProps, IState> {
    render() {
        if (this.props.data) {
        return (
            <BootstrapTable data={ this.props.data }>           
            <TableHeaderColumn dataField='id' dataAlign='center' width='80' isKey={ true }>ID</TableHeaderColumn> 
            <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
            <TableHeaderColumn dataField='attendanceType'>Attendance Type</TableHeaderColumn>            
            </BootstrapTable>);
        } else {
            return (<p>-</p>);
        }
    }
}

export class EnrollmentsDetailsTable extends React.Component<IProps, IState> {    
    
    isExpandableRow(row:any) {
        return  true;
    }

    expandComponent(row: any) {
        return (
            <LogsTable data={ row.logs } />
        );
    }

    expandColumnComponent(row:any) {        
        let iconClass = (row.isExpanded) ? 'fa fa-minus-square' : 'fa fa-plus-square';
        return (
            <div className="text-center"><em className={iconClass}></em></div>
        );
    }

    buttonFormater(cell: any, row: any) { 
        let navTo = `/attendanceLogs/${row.id}`;
        return (
            <NavLink to={navTo}><button className="btn btn-default"><i className="fa fa-mail-forward"></i></button><span className="marginLeft-sm">{row.courseName}</span></NavLink>
        );
    }

    render() {        
        return (            
            <BootstrapTable data={ this.props.data }
                options={ options }
                expandableRow={ this.isExpandableRow }
                expandComponent={ this.expandComponent }
                expandColumnOptions={ {
                expandColumnVisible: true,
                expandColumnComponent: this.expandColumnComponent,
                columnWidth: 50
                } }>
                <TableHeaderColumn dataField='id' dataAlign='center' width='80' isKey={ true }>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='courseName' dataFormat={this.buttonFormater}>Course Title</TableHeaderColumn>
                <TableHeaderColumn dataField='logsCount' dataAlign='center' width='150' >Logs</TableHeaderColumn>                
            </BootstrapTable>
        );
    }
}