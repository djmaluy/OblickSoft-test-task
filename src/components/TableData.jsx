import React from "react";
import { Table } from "react-bootstrap";
import { Refresh } from "./Refresh";

export const TableData = ({
  messages,
  isFetching,
  fetchData,
  sortedData,
  onRowClick,
}) => {
  const onRefresh = () => {
    messages.length = 0;
    fetchData();
  };

  return (
    <div className="table-wrapper">
      <input type="text" className="search" />
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
                  <tr
                    onClick={() => onRowClick(message)}
                    key={message.id}
                    className={
                      message.isRead === false ? "read row" : "no-read row"
                    }
                  >
                    <td className="avatar">
                      <img
                        className={
                          message.image === "male" ? "male-img" : "female-img"
                        }
                        src={`/icons/${message.image}.svg`}
                        alt={message.image}
                      />
                    </td>

                    <td className="user-name">
                      <div>{message.name}</div>
                      <span>{message.phone}</span>
                    </td>
                    <td className="text-color">{message.text}</td>
                    <td className="date">
                      <span>{message.date}</span>
                    </td>
                  </tr>
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
