import http from "./HTTPService";
import { apiUrl } from "../config.json";

const getSeasons = (year) => {
  return http.get(`${apiUrl}seasons.json?limit=18&offset=55`);
};
const getWorldChampionByYear = (year) => {
  return http.get(`${apiUrl}${year}/driverStandings/1.json`);
};

const getRaceWinnersData = (year) => {
  return http.get(`${apiUrl}${year}/results/1.json`);
};

export { getSeasons, getWorldChampionByYear, getRaceWinnersData };
