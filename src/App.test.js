import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./Reducers";
import App from "./App";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
test("renders mobiquity Assignment", () => {
  const { container, getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(getByText("F1 WORLD CHAMPIONS")).toBeInTheDocument();
});
