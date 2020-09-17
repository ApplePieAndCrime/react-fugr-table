import React from "react";

export default function UserItem({
  id,
  firstName,
  lastName,
  email,
  phone,
  onClickItem,
  classNames,
}) {
  return (
    <tr className={classNames} onClick={onClickItem}>
      <td>{id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
  );
}
