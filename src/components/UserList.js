import React from "react";
import UserItem from "./UserItem";

export default function UserList({ users }) {
  const headers = ["id", "fistName", "lastName", "email", "phone"];

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return <UserItem user={user} key={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
