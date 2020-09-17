import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setDataUrl } from "../redux/actions/users";

const links = [
  {
    name: "маленький",
    className: "btn-outline-warning",
    url:
      "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
  },
  {
    name: "большой",
    className: "btn-outline-success",
    url:
      "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
  },
];
const Home = () => {
  const dispatch = useDispatch();
  const dataUrl = useSelector(({ users }) => users.dataUrl);

  return (
    <div className="container text-center">
      <div
        className="row justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col align-self-center col-lg-3">
          <p>Выбери набор данных:</p>
          <div className="d-flex justify-content-between">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => dispatch(setDataUrl(link.url))}
                className={`btn mr-4 ${link.className} ${
                  dataUrl === link.url ? "active" : ""
                }`}
              >
                {link.name}
              </button>
            ))}
            <Link to="/users" className="btn">
              <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-right-circle"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
