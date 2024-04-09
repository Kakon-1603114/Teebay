import React from "react";
import { Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "./Teebay";
import Authorization from "./middlewares/Authorization";
import NotFound from "./pages/NotFound";
import Layout from "./ui/Layout";

function App() {
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
        />
      ))}

      <Route
        path="/"
        element={<Authorization />}>
        <Route path="/" element={<Layout />}>
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}>
            {route.children &&
              route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={`${route.path}${child.path}`}
                  element={child.element}>
                  {child.children &&
                    child.children.map((grandChild, grandChildIndex) => (
                      <Route
                        key={grandChildIndex}
                        path={grandChild.path}
                        element={grandChild.element}
                      />
                    ))}
                </Route>
              ))}

          </Route>

        ))}
      </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
