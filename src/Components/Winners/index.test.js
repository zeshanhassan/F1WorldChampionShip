import { render } from "@testing-library/react";
import Winners from "./index";
import { getRaceWinnersData } from "./../../Services/F1RaceService";

test("renders winners component", () => {
  render(<Winners />);
});

it("testing api", async function () {
  const { data, status } = await getRaceWinnersData("2005");
  expect(status).toBe(200);
  expect(data.MRData.RaceTable.Races).not.toEqual([]);
});
