import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./Reducers";
import App from "./App";
import { getSeasons } from "./Services/F1RaceService";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

test("renders mobiquity Assignment", () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByText("F1 WORLD CHAMPIONS")).toBeInTheDocument();
});

it("testing api", async function () {
  const { data, status } = await getSeasons();
  expect(status).toBe(200);
  expect(data.MRData.SeasonTable.Seasons).not.toEqual([]);
});
