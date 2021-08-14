import { render } from "@testing-library/react";
import Seasons from "./index";
import { getWorldChampionByYear } from "./../../Services/F1RaceService";

test("renders winners component", () => {
  render(<Seasons />);
});

it("testing api", async function () {
  const { data, status } = await getWorldChampionByYear("2005");
  expect(status).toBe(200);
  expect(data.MRData.StandingsTable.StandingsLists).not.toEqual([]);
});
