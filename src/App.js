import React, { useState, useEffect, useCallback } from "react";
import { TableData } from "./components/TableData";

function App() {
  const [messages, setMessages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const response = await fetch("/api/data.json");
      const result = await response.json();
      setIsFetching(false);
      setMessages(result);
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getSortData = useCallback(() => {
    const sortedData = [...messages];
    setSortedData(
      sortedData.sort((a, b) =>
        a.isRead > b.isRead ? 1 : b.isRead > a.isRead ? -1 : 0
      )
    );
  }, [messages]);

  useEffect(() => {
    getSortData();
  }, [getSortData]);

  const onRowClick = (row) => {
    setMessages(
      messages.map((message) => {
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
