
import Styles from "../Componets/Navbar.module.css";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Text } from "@chakra-ui/react";

export default function Logut() {
  const { logout } = useContext(AuthContext);

  const handleLogut = () => {
    localStorage.removeItem("token");
    logout();
  };

  return (
    <div className={Styles.mainDiv}>
      <Text onClick={handleLogut}>Logout</Text>
    </div>
  );
}
