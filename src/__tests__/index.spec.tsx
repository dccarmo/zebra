import React from "react";
import "react-native";
import renderer from "react-test-renderer";

import Zebra from "../index";

it("renders correctly", () => {
  const tree = renderer.create(
    <Zebra />,
  );
  expect(tree).toBeDefined();
});
