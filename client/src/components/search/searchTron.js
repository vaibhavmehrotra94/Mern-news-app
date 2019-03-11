import React from "react";

export default function searchTron(props) {
  return (
    <div className="jumbotron">
      <h3 className="display-5">Search By Keywords</h3>
      <section className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={props.changed}
          value={props.searchText}
        />
      </section>
    </div>
  );
}
