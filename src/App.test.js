import React from "react";
import { render } from "@testing-library/react";
import MasterForm from "./MasterForm";

test("renders form component", () => {
  const { getByText } = render(<MasterForm />);
  const linkElement = getByText(/two step wizard/i);
  expect(linkElement).toBeInTheDocument();
});
