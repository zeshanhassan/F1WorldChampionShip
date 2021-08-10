import {
  GET_F1SEASONS_DATA,
  GET_F1SEASONS_SUCCEEDED,
  GET_F1SEASONS_FAILED,
} from "../Actions";

const defaultState = {
  f1SeasonsData: [],
  isFetching: false,
};
const fiSeasons = (state = defaultState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case GET_F1SEASONS_SUCCEEDED: {
      return {
        f1SeasonsData: action.data,
        isFetching: false,
      };
    }
    case GET_F1SEASONS_DATA: {
      return {
        f1SeasonsData: newState.f1SeasonsData,
        isFetching: true,        
      };
    }
    case GET_F1SEASONS_FAILED: {
      return {
        isFetching: false,
        f1SeasonsData: newState.f1SeasonsData,
      };
    }

    default: {
      return state;
    }
  }
};
export default fiSeasons;
