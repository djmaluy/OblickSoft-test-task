import multisort from "multisort";
import React, { useState, useEffect, useCallback } from "react";
import { TableData } from "./components/TableData";

function App() {
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [filter, setFilter] = useState("");

  //  ==== получаем messages из api
  const fetchData = async () => {
    try {
      setIsFetching(true);
      const response = await fetch("/api/data.json");
      const result = await response.json();
      setMessages(result);
      setIsFetching(false);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const items = useMemo(() => {
  //   if (filter) {
  //     return sortedData.filter((m) => {
  //       const matchValue = filter.toLowerCase();
  //       const { name, phone, text } = m;
  //       if (name.toLowerCase().includes(matchValue)) return true;
  //       if (phone.toLowerCase().includes(matchValue)) return true;
  //       if (text.toLowerCase().includes(matchValue)) return true;
  //       return false;
  //     });
  //   }
  //   return sortedData;
  // }, [filter]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  //  ===== Сортируем  сообщения по прочитанным
  const getSortData = useCallback(() => {
    const sortedData = [...messages];
    setSortedData(
      sortedData.sort((a, b) =>
        a.isRead > b.isRead ? 1 : b.isRead > a.isRead ? -1 : 0
      )
    );
  }, [messages]);

  const res = useCallback(() => {
    const inputData = [...messages];
    const criteria = ["isRead", "date"];
    const resData = multisort(inputData, criteria);
    setSortedData(resData);
  }, [messages]);

  useEffect(() => {
    getSortData();
    res();
  }, [getSortData, res]);

  // ==== Отмечаем непрочитаное сообщение на прочитаное
  const onRowClick = (row) => {
    const clickedRow = [...messages];
    setMessages(
      clickedRow.map((message) => {
        if (message.id === row.id && message.isRead === true)
          return {
            ...message,
            isRead: false,
          };
        return message;
      })
    );
  };

  return (
    <div className="container">
      <TableData
        handleChange={handleChange}
        onRowClick={onRowClick}
        sortedData={sortedData}
        messages={messages}
        isFetching={isFetching}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
