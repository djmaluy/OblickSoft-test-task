import React from "react";
import * as moment from "moment";

export const TableRow = ({ message, onRowClick, light }) => {
  return (
    <>
      <tr
        onClick={() => onRowClick(message)}
        className={message.isRead === false ? "read row" : "no-read row"}
      >
        <td className="avatar">
          <img
            className={message.image === "male" ? "male-img" : "female-img"}
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
          <div>{light(message.name)}</div>
          <span>{light(message.phone)}</span>
        </td>
        <td className="text">{light(message.text)}</td>
        <td className="date">
          <div>{message.time}</div>
        </td>
        <td className="date">
          <div>{moment(message.date).format("MM:DD:YYYY")}</div>
        </td>
      </tr>
    </>
  );
};
