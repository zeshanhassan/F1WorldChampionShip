import { call, put, takeLatest } from "redux-saga/effects";
import { apiUrl } from "./../../config.json";
import {
  GET_F1SEASONS_DATA,
  GET_F1SEASONS_SUCCEEDED,
  GET_F1SEASONS_FAILED,
} from "./../../Actions";
import axios from "axios";
import { toast } from "react-toastify";
const SERVERNOTFOUND = "Server not running..";

function* fetchF1SeasonsAysnc(action) {
  try {
    const f1Seasons = yield call(
      axios.get,
      `${apiUrl}seasons.json?limit=18&offset=55`,
      
    );
    console.log(f1Seasons);
    if (f1Seasons.status === 200) {
      yield put({
        type: GET_F1SEASONS_SUCCEEDED,
        data: f1Seasons.data.MRData,
      });
    } else {
      yield put({ type: GET_F1SEASONS_FAILED });
    }
  } catch (e) {
    yield put({ type: GET_F1SEASONS_FAILED });
    toast.error(SERVERNOTFOUND);
  }
}

function* mySaga() {
  yield takeLatest(GET_F1SEASONS_DATA, fetchF1SeasonsAysnc);
}
export default mySaga;
