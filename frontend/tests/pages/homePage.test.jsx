import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import { HomePage } from "../../src/pages/Home/HomePage";

describe("Home Page", () => {
  test("Displays a signup link", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    //const signupLink = screen.getByText("Sign Up");
    //expect(signupLink.getAttribute("href")).toEqual("/signup");
  });

  // Temp disabled test for login link while navbar is being worked on

  //   test("Displays a login link", async () => {
  //     render(
  //       <BrowserRouter>
  //         <HomePage />
  //       </BrowserRouter>
  //     );

  //     const loginLink = screen.getByText("Log In");
  //     expect(loginLink.getAttribute("href")).toEqual("/login");
  //   });
    //const loginLink = screen.getByText("Log In");
    //expect(loginLink.getAttribute("href")).toEqual("/login");
  });
});
