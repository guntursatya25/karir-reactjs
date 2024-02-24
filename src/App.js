import React, { Component } from 'react'
// import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home, Succes, ErrorPage } from './pages'
import './App.css'; 
// import NavbarComponent from './components/NavbarComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sukses",
    element: <Succes/>,
  }
]);

export default class App extends Component {
  render() {
    return (
      <>
      {/* <NavbarComponent/> */}
      <RouterProvider router={router} />
      </>
    )
  }
}
