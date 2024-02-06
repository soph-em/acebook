import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import React from "react";
import "@testing-library/jest-dom";


import Navbar from "../../src/pages/Navbar/Navbar";

test("Navbar renders correctly if you are not logged in", () => {
    render(<Navbar />)
    const signUpLink = screen.getByTestId("sign-up");
    expect(signUpLink.textContent).toBe("Sign Up");
})

test("Navbar renders correctly if you are logged in", () => {
    window.localStorage.setItem("token","mockedToken")
    render(<Navbar />)

    const testLink = screen.getByTestId("test-profile")
    expect(testLink).toHaveTextContent("My Profile")
}) 
