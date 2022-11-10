import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
 
function Excel(props){
   const {newTitle,newField,selectedRows,fileName} = props;
//    console.log(fileName)
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="excel-download-btn"
                    table="table-to-xls"
                    filename={fileName}
                    sheet="UploadVersion"
                    buttonText="Export as XLS"/>
                <table id="table-to-xls" className='xlstable'>
                    <tr>
                       { newTitle.map(title =><th>{title}</th>)} 
                    </tr>
                    {
                        selectedRows.map(rowData=>
                            <tr>
                                {
                                    newField.map(col=>
                                        <td>{rowData[col]}</td>)
                                }
                            </tr>)
                    }
                </table>
 
            </div>
        );
    
}
 
export default Excel