import jwtDecode from "jwt-decode";
import React, { useReducer } from "react";

const initialState = {
  user: null,
  isSeller: false,
};

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

// Get the isSeller value from localStorage and convert it to a boolean
const isSellerFromLocalStorage = localStorage.getItem("isSeller");
initialState.isSeller = isSellerFromLocalStorage === "true";

const AuthContext = React.createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  toggleIsSeller: (data) => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "TOGGLE_IS_SELLER":
      return { ...state, isSeller: action.payload };

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("username", userData.firstname);
    dispatch({
      type: "TOGGLE_IS_SELLER",
      payload: userData.isSeller,
    });
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  };

  const toggleIsSeller = (data) => {
    localStorage.setItem("isSeller", data);
    dispatch({ type: "TOGGLE_IS_SELLER", payload: data });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isSeller: state.isSeller,
        login,
        logout,
        toggleIsSeller,
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
