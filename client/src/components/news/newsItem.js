import React from "react";
import "./newsItem.css";

export default function newsItem(props) {
  let { name, desc, url, category, imgUrl } = props.data;

  if (imgUrl === null || imgUrl === undefined || imgUrl === "") {
    imgUrl =
      "https://www.cartridge.co.za/wp-content/uploads/2018/07/default-image.jpg";
  }

  return (
    <div className="shadow ">
      <a href={url} target="_blank">
        <div className="gridbox">
          <div className="imgContainer">
            <img
              src={imgUrl}
              alt={name}
              onerror={
                '()=>this.src!="../../static/error.png"?this.src="../../static/error.png":null'
              }
            />
          </div>
          <div>
            <h4>{name}</h4>
            <h5>{category}</h5>
            <p>{desc}</p>
          </div>
        </div>
      </a>
    </div>
  );
}
