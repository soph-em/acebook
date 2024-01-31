import { render, screen } from "@testing-library/react";
import Logout from "../../src/components/Logout/Logout";

describe("Logout Component", () => {
  test("Logout button is rendered on screen", () => {

    render(
        <Logout/>
    );

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton.textContent).toEqual("Logout");
  });


});
  