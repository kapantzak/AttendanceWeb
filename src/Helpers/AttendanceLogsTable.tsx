// import * as React from 'react';
// import * as bsTbl from 'react-bootstrap-table';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
// import * as coursesMod from './../Models/CourseInstance';

// interface IProps {
//     data: coursesMod.ICourseInstance[];
//     qrCodeGenerator: any,
//     toggleQRCodeButton: any
// }
// interface IState {}

// export class CoursesTable extends React.Component<IProps, IState> {

//     constructor(props: any) {
//         super(props);        
//     }

//     render() {
//         const options = {};
//         const selectRowProp: bsTbl.SelectRow = {
//             mode: 'none',
//             clickToSelect: true,
//             onSelect: this.props.qrCodeGenerator
//         };
//         return (
//             <div className="mod-students-table-holder">
//                 <BootstrapTable data={this.props.data} selectRow={selectRowProp} insertRow={false} deleteRow={false} options={options} striped hover condensed>                    
//                     <TableHeaderColumn dataField="Id" isKey={true} width="80" className="text-center" columnClassName="text-center">ID</TableHeaderColumn>
//                     <TableHeaderColumn dataField="CourseAssignmentId" hidden={true}></TableHeaderColumn>
//                     <TableHeaderColumn dataField="Title">Title</TableHeaderColumn>
//                     <TableHeaderColumn dataField="Descr">Description</TableHeaderColumn>                    
//                 </BootstrapTable>
//             </div>
//         );
//     }
// }