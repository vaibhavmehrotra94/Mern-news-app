import React from "react";
import NewsItem from "./newsItem";

export default function news(props) {
  return (
    <React.Fragment>
      <h3 className="text-center">News List</h3>
      <br />
      <br />
      {props.data
        ? props.data.map(news => <NewsItem key={news._id} data={news} />)
        : null}
    </React.Fragment>
  );
}
