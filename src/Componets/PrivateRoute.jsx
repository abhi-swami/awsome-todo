import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate,  } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const toast = useToast();
  useEffect(()=>{
      if (!isLoggedIn) {
        toast({
          title: "Please Login First",
          status: "info",
          duration: 1000,
          isClosable: true,
        });
      }

  },[isLoggedIn,toast])

  return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
