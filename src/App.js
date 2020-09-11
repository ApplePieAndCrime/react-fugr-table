import React, { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  let pages = [];
  const perPage = 50;

  const smallDataUrl =
    "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
  const bigDataUrl =
    "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

  async function fetchData() {
    const res = await fetch(smallDataUrl);
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function setPages() {
    let numOfPages = Math.ceil(users.length / perPage);
    for (let i = 1; i <= numOfPages; i++) {
      pages.push(i);
    }
  }

  function getUsers(page) {
    let from = page * perPage - perPage;
    let to = page * perPage;
    return users.slice(from, to);
  }

  function addUser(user) {
    setUsers(users.push(user));
  }

  setPages();
  return (
    <div className="App container-fluid">
      <div className="panel">
        <p className="title text-secondary display-4">List of Users</p>
        <div className="search-container d-flex" style={{ width: "40%" }}>
          <input
            type="text"
            style={{ minWidth: "80%", marginRight: "15px" }}
          ></input>
          <button className="btn btn-info">Найти</button>
        </div>
        <button className="btn btn-add btn-outline-success">+</button>
      </div>

      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          <UserList users={getUsers(page)}></UserList>

          {pages.length != 1 && (
            <nav className="page-nav d-flex justify-content-center mb-30">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => setPage(page - 1)}
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                {pages.map((p) => {
                  return (
                    <li className={`page-item ${p == page && "active"}`}>
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </a>
                    </li>
                  );
                })}

                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => setPage(page + 1)}
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
