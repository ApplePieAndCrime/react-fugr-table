import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { UserList, AddUser, Loader } from "../components";
import { setLoading, setUsers } from "../redux/actions/users";

const sortBy = (arr, key, order = "asc") => {
  const sorting = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  arr = arr.sort((a, b) => sorting(a[key], b[key]));
  return order === "asc" ? arr : arr.reverse();
};

const findWord = (arr, word) => {
  if (!word) return arr;

  const founded = arr.filter((user) => {
    const values = Object.values(user);

    let isFound = false;
    values.forEach((val) => {
      if (val.toString().includes(word)) isFound = true;
      return;
    });

    return isFound;
  });

  return founded;
};

const Users = () => {
  const { dataUrl, loading, headers } = useSelector((state) => state.users);
  const [sortHeader, setSortHeader] = useState({
    title: headers[0],
    order: "asc",
  });
  const [searchWord, setSearchWord] = useState("");
  const users = useSelector(({ users }) =>
    findWord(
      sortBy(users.users, sortHeader.title, sortHeader.order),
      searchWord
    )
  );
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  let pages = [];
  const perPage = 50;

  const fetchData = () => {
    dispatch(setLoading(true));
    axios.get(dataUrl).then(({ data }) => {
      dispatch(setUsers(data));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setPages = () => {
    let numOfPages = Math.ceil(users.length / perPage);
    for (let i = 1; i <= numOfPages; i++) {
      pages.push(i);
    }
  };

  const getUsers = (page) => {
    let from = page * perPage - perPage;
    let to = page * perPage;
    return users.slice(from, to);
  };

  const checkSearchWord = () => {
    const searchInput = document.querySelector("#search-input");

    if (!searchInput) return;

    setSearchWord(searchInput.value);
  };

  setPages();

  return (
    <div className="container-fluid">
      <div className="panel">
        <p className="title text-secondary display-4">Список юзеров</p>
        <div className="search-container d-flex" style={{ width: "40%" }}>
          <input
            id="search-input"
            type="text"
            style={{ minWidth: "80%", marginRight: "15px" }}
          ></input>
          <button className="btn btn-info" onClick={() => checkSearchWord()}>
            Найти
          </button>
        </div>
        <AddUser />
      </div>

      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          <p>Найдено: {users.length}</p>
          <UserList
            users={getUsers(page)}
            headers={headers}
            onClickHeader={(header) =>
              header === sortHeader.title
                ? sortHeader.order === "asc"
                  ? setSortHeader({ title: header, order: "desc" })
                  : setSortHeader({ title: header, order: "asc" })
                : setSortHeader({ title: header, order: "asc" })
            }
            sortHeader={sortHeader}
          ></UserList>

          {pages.length > 0 && (
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
                    <li
                      key={p}
                      className={`page-item ${p === page && "active"}`}
                    >
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
};

export default Users;
