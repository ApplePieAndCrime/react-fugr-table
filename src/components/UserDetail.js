import React from "react";

const UserDetail = ({
  firstName,
  lastName,
  address = {},
  description = {},
}) => {
  return (
    <div className="card" style={{ width: "60%", margin: "20px 0" }}>
      <div className="card-body">
        <p>
          Выбран пользователь{" "}
          <b>
            {firstName} {lastName}
          </b>
        </p>
        <p>Описание:</p>
        <textarea
          className="form-control"
          defaultValue={description}
          rows="3"
        ></textarea>
        <p>
          Адрес проживания: <b>{address.streetAddress}</b>
        </p>
        <p>
          Город: <b>{address.city}</b>
        </p>
        <p>
          Провинция/штат: <b>{address.state}</b>
        </p>
        <p>
          Индекс: <b>{address.zip}</b>
        </p>
      </div>
    </div>
  );
};

export default UserDetail;
