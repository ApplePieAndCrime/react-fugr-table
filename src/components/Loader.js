import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
