import React from "react";
import { Table } from "react-bootstrap";
import { Refresh } from "./Refresh";
import { SearchInput } from "./SearchInput";
import * as moment from "moment";

export const TableData = ({
  messages,
  isFetching,
  fetchData,
  sortedData,
  onRowClick,
  handleChange,
}) => {
  const onRefresh = () => {
    messages.length = 0;
    fetchData();
  };

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
                      <img
                        className="social"
                        src={`/icons/${message.social}.svg`}
                        alt={message.image}
                      />
                    </td>

                    <td className="user-name">
                      <div>{message.name}</div>
                      <span>{message.phone}</span>
                    </td>
                    <td className="text">{message.text}</td>
                    <td className="date">
                      <div>{message.time}</div>
                    </td>
                    <td className="date">
                      <div>{moment(message.date).format("MM:DD:YYYY")}</div>
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
