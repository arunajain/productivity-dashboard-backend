import { add } from "./math.js";
describe("add", () => {
  it("should add two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
