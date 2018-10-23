import * as React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import * as students from './../Models/Users';

interface IProps {
    data: students.IUser[]
}
interface IState {}

const options = {
    expandRowBgColor: '#344861'
};

class CourseStudentTable extends React.Component<IProps, IState> {
    render() {
        if (this.props.data) {
        return (
            <BootstrapTable data={ this.props.data }>
            <TableHeaderColumn dataField='id' dataAlign='center' width='80' isKey={ true }>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName'>First Name</TableHeaderColumn>
            <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>            
            </BootstrapTable>);
        } else {
            return (<p>-</p>);
        }
    }
}

export class CoursesDetailsTable extends React.Component<IProps, IState> {    
    
    isExpandableRow(row:any) {
        return  true;
    }

    expandComponent(row: any) {
        return (
            <CourseStudentTable data={ row.students } />
        );
    }

    expandColumnComponent(row:any) {        
        let iconClass = (row.isExpanded) ? 'fa fa-minus-square' : 'fa fa-plus-square';
        return (
            <div className="text-center"><em className={iconClass}></em></div>
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
                <TableHeaderColumn dataField='title'>Course Title</TableHeaderColumn>
                <TableHeaderColumn dataField='studentsCount' dataAlign='center' width='150' >Students</TableHeaderColumn>                
            </BootstrapTable>
        );
    }
}