import { NavLink } from "react-router-dom";
import Styles from "../Componets/Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Logut from "./Logout";


const link = [
  { path: "/login", text: "Login" },
  { path: "/signup", text: "Signup" },
];

export default function Navbar() {
  const [data, setData] = useState("");
  const { isLoggedIn, login,  } = useContext(AuthContext);
  useEffect(() => {
    setData(localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    if (data) {
      login();
    } 
  }, [data, login]);

  return (
    <div className={Styles.mainDiv}>
      <NavLink
        className={({ isActive }) => {
          return isActive ? Styles.active : Styles.disActive;
        }}
        to={"/"}
      >
        Home
      </NavLink>
      {isLoggedIn ? (
        <Logut />
      ) : (
        link.map((el) => (
          <NavLink
            className={({ isActive }) => {
              return isActive ? Styles.active : Styles.disActive;
            }}
            key={el.path}
            to={el.path}
          >
            {el.text}
          </NavLink>
        ))
      )}

      <NavLink
        className={({ isActive }) => {
          return isActive ? Styles.active : Styles.disActive;
        }}
        to={"/todo"}
      >
        Todo
      </NavLink>
    </div>
  );
}
