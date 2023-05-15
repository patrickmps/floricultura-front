import {
  createBrowserRouter,
} from "react-router-dom";
import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import App from "../App";
import { Suppliers } from "../pages/Suppliers";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'produtos',
        element: <Products />
      },
      {
        path: 'fornecedores',
        element: <Suppliers />
      },
    ]
  }
  
]);