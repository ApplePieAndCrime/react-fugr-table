import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/actions/users";

export default function AddUser() {
  const headers = useSelector(({ users }) => users.headers);
  const dispatch = useDispatch();

  const [visibleModal, setVisibleModal] = useState(false);
  const [possibleAdd, setPossibleAdd] = useState(false);

  const inputs = document.querySelectorAll(".add-user .modal-body input");

  const visibleModalStyle = {
    display: "block",
    backgroundColor: "rgb(0, 0, 0, 0.4)",
  };
  const hiddenModalStyle = { display: "none" };

  const checkPosibleAdd = () => {
    let isEmpty = false;
    inputs.forEach((input) => {
      if (!input.value) {
        isEmpty = true;
        return;
      }
    });
    isEmpty ? setPossibleAdd(false) : setPossibleAdd(true);
  };

  const addNewUser = () => {
    let user = {};
    inputs.forEach((input) => {
      const { name, value } = input;
      user[name] = value;
    });
    dispatch(addUser(user));
    inputs.forEach((input) => (input.value = ""));
    setVisibleModal(false);
  };

  return (
    <div className="add-user">
      <button
        className="btn btn-add btn-outline-success"
        onClick={() => setVisibleModal(true)}
      >
        +
      </button>

      <div
        className="modal"
        style={visibleModal ? visibleModalStyle : hiddenModalStyle}
        id="addUserModal"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Добавить пользователя
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setVisibleModal(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {headers.map((header) => (
                <div key={header} className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name={header}
                    placeholder={header}
                    onChange={() => checkPosibleAdd()}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className={`btn btn-outline-success`}
                disabled={!possibleAdd}
                onClick={() => addNewUser()}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
