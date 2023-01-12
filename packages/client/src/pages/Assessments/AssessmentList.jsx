import React, { useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  const columns = useMemo(() => [

    {
      Header: `S.No`,
      accessor: `id`,
    },
    {
      Header: `Instrument Type`,
      accessor: `instrumentType`,
    },
    {
      Header: `Cat Name`,
      accessor: `catName`,
    },
    {
      Header: `Cat Score`,
      accessor: `score`,
    },
    {
      Header: `Risk Level`,
      accessor: `riskLevel`,
    },
    {
      Header: `Cat Date of Birth`,
      accessor: `catDateOfBirth`,
    },
    {
      Header: `Created Time`,
      accessor: `createdAt`,
    },
    {
      Header: `UPDATED TIME`,
      accessor: `updatedAt`,
    },
    {
      Cell: ({ row }) =>
        <button onClick={() => row.original}>Delete</button>,
      Header: `Delete`,
    },

  ], []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments }, useSortBy);

  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, [ ]);

  return (
    <div>
      <table {...getTableProps()} style={{ border: `solid 1px blue` }}>
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    background: `white`,
                    border: `solid 3px black`,
                    color: `Red`,
                    fontWeight: `bold`,
                  }}
                >
                  {column.render(`Header`)}
                  <span>
                    {column.isSorted ?
                      column.isSortedDesc ?
                        `🔽` :
                        `🔼` :
                      ``}
                  </span>
                </th>)}
            </tr>)}
        </thead>
        <tBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td
                    {...cell.getCellProps()}
                    style={{
                      background: `purple`,
                      border: `solid 3px black`,
                      color: `white`,
                      fontWeight: `bold`,
                      padding: `10px`,
                    }}
                  >
                    {cell.render(`Cell`)}
                  </td>)}
              </tr>
            );
          })}
        </tBody>
      </table>
    </div>
  );
};
