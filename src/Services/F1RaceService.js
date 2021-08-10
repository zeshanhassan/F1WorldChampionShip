import http from "./HTTPService";
import { apiUrl } from "../config.json";

const getWorldChampionByYear = (year) => {
  return http.get(`${apiUrl}${year}/driverStandings/1.json`);
};

const getRaceWinnersData = (year) => {
  return http.get(`${apiUrl}${year}/results/1.json`);
};

export { getWorldChampionByYear, getRaceWinnersData };
