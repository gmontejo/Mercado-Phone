import React from "react";

export default function Title({ name, title }) {
  return (
    <div className="row">
      <div className="col-12 mx-auto my-1 text-center text-title">
        <h1 className="font-weight-bold">{name}</h1>
      </div>
    </div>
  );
}
