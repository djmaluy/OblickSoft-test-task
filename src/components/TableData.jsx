import React, { useCallback } from "react";
import { Table } from "react-bootstrap";
import { Refresh } from "./Refresh";
import { SearchInput } from "./SearchInput";

import { Hightlight } from "./Hightlight";
import { TableRow } from "./TableRow";

export const TableData = ({
  messages,
  isFetching,
  fetchData,
  sortedData,
  onRowClick,
  handleChange,
  filter,
}) => {
  const onRefresh = () => {
    messages.length = 0;
    fetchData();
  };

  const light = useCallback(
    (str) => {
      return <Hightlight filter={filter} str={str} />;
    },
    [filter]
  );

  return (
    <div className="table-wrapper">
      <SearchInput handleChange={handleChange} />
      <div className="head-table">
        {!isFetching && <Refresh onRefresh={onRefresh} />}
        <strong>Знайдено {messages.length} клієнтів</strong>
      </div>
      {isFetching ? (
        <div>Зачекайте, дані завантажуються</div>
      ) : (
        <div className="table-content">
          <Table className="table-data">
            <tbody>
              {sortedData.map((message) => {
                return (
                  <TableRow
                    message={message}
                    key={message.id}
                    light={light}
                    onRowClick={onRowClick}
                  />
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
      <div className="pagination">
        <span>1 2 3 ... 4 5 6</span>
      </div>
    </div>
  );
};
