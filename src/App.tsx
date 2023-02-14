import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout />}>
      {/* <Route path="/" element={<Products />} /> */}
      {/* <Route path="/product/:id" element={<Product />} /> */}
    </Route>,
  ])
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
