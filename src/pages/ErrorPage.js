import React from "react";
import { useRouteError } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <NavbarComponent />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
}
