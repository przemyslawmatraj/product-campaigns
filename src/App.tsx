import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Products from "./pages/Products/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Products />} />
          {/* <Route path="/product/:id" element={<Product />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
