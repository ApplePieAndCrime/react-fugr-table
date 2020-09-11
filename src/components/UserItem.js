import React, { useState } from "react";

export default function UserItem({ user, key }) {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <tr key={key} onClick={() => setSelected(true)}>
        <td>{user.id}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
      </tr>
    </>
  );
}
