import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  useExpanded,
  useFilters,
  useMountedLayoutEffect,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Input, Row, Table } from "reactstrap";
import { Checkbox } from "./Checkbox";
import { DefaultColumnFilter, Filter } from "./Filters";

const TableContainer = ({
  columns,
  data,
  renderRowSubComponent,
  onSelectedRowsChange,
  exportAllSelectedRows,
  exportAllSelectedRowsasXLS,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [flatrowdata, setFlatrowdata] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    selectedFlatRows,
    nextPage,
    rows,
    previousPage,
    setPageSize,
    state: { pageIndex, selectedRowIds, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: 5,
        selectedRowIds: selectedRows,
        
      },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );
  const firstPageRows = rows.slice(0, 10);
  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? "⇅" : "⇅") : "⇅";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };
  useMountedLayoutEffect(() => {
    console.log("SELECTED ROWS CHANGED", selectedRowIds);
    setFlatrowdata(selectedRowIds);
    onSelectedRowsChange && onSelectedRowsChange(selectedRowIds);
  }, [onSelectedRowsChange, selectedRowIds]);
  return (
    <Fragment>
      <div className="uploadversion-flex">
        <div>
          <Link class="blue-btn uv-btn" style={{ textDecoration: "none" }}>
            Upload Versions <img src="Images/UV_title_icon.png" alt="" />
          </Link>
        </div>
        <div class="outer-div-export-btn">
          <button
            class="btn btn-default dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            // className="export-btn"
            style={{ background: "#25468c", color: "#fff", width: "100px" }}
          >
            Export
            <span class="caret"></span>
          </button>

          <ul class="dropdown-menu">
            <li style={{ textDecoration: "none" }}>
              <a
                style={{ textDecoration: "none" }}
                href="#"
                onClick={() => exportAllSelectedRows(selectedRowIds, "CSV")}
                className="csv-download-btn"
              >
                Export as CSV
              </a>
            </li>
            <li>
              <a href="#"> </a>
            </li>
            <li style={{ textDecoration: "none" }}>
              <a
                style={{ textDecoration: "none" }}
                href="#"
                onClick={() =>
                  exportAllSelectedRowsasXLS(selectedRowIds, "XLS")
                }
                className="csv-download-btn"
              >
                Export as XLS
              </a>
            </li>
            <li>
              <a href="#"> </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="table-container">
        <Table bordered hover {...getTableProps()} className="whole-table">
          <thead className="table-thead">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="table-thead-tr"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="table-thead-tr-th"
                  >
                    <div {...column.getSortByToggleProps()} title="Sorting">
                      {column.render("Header")}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr className="table-tbody-tr">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          style={{ paddingLeft: "7px" }}
                          className="table-tbody-tr-td"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Row className="page-container">
        <div className="prev-btn">
          <div onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <img src="images/prevLast.png" width="12px"></img>
          </div>
          <div onClick={previousPage} disabled={!canPreviousPage}>
            <img src="images/prev.png" width="8px"></img>
          </div>
        </div>
        <div className="page-of-page">
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
        <div className="page-no">
          <Input
            className="input-page-no"
            type="number"
            min={1}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </div>
        <div className="show-row">
          <Input
            className="input-show-row"
            type="select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option
                className="input-show-row-option"
                key={pageSize}
                value={pageSize}
              >
                Show {pageSize}
              </option>
            ))}
          </Input>
        </div>
        <div className="next-btn">
          <div onClick={nextPage} disabled={!canNextPage}>
            <img src="images/next.png" width="8px"></img>
          </div>
          <div onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <img src="images/nextLast.png" width="12px"></img>
          </div>
        </div>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
