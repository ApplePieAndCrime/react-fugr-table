import React, { useState } from "react";
import classNames from "classnames";
import { UserItem, UserDetail } from "./";
import "../scss/UserList.scss";

export default function UserList({
  users,
  headers,
  onClickHeader,
  sortHeader,
}) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                onClick={() => onClickHeader(header)}
                className={`sort`}
              >
                <span>{header}</span>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className={`svg ${classNames({
                    ordered:
                      header === sortHeader.title && sortHeader.order === "asc",
                    "ordered-rotated":
                      header === sortHeader.title &&
                      sortHeader.order === "desc",
                  })} bi bi-arrow-down-short`}
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <React.Fragment key={index}>
                <UserItem
                  {...user}
                  onClickItem={() => setSelectedUser(user)}
                  classNames={
                    selectedUser === user ? "bg-success text-light" : ""
                  }
                ></UserItem>
                {selectedUser === user && (
                  <tr>
                    <td colSpan="5">
                      <UserDetail {...selectedUser} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
