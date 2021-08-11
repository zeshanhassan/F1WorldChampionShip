import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import MQModal from "../../Shared/MQModel/index";
import Winners from "./../Winners";
import "./index.css";
const Seasons = ({ data }) => {
  const seasonsData = data && data.length > 0 ? data : [];
  const [openWinnerModel, setOpenWinnerModel] = useState(false);
  const [selectedYear, setSelectedYear] = useState(0);
  const openModel = (year) => {
    setSelectedYear(year);
    setOpenWinnerModel(true);
  };
  return (
    <>
      {seasonsData &&
        seasonsData.length > 0 &&
        seasonsData.map((item, index) => (
          <div className="card-item col-sm-3" key={index} onClick={() => {
            openModel(item.season);
          }}>
            <div className="container">
              <div className="inner">
                <img src="/images/race-car1.png"/>
                <div className="decor">
                </div>
                <div className="year">{item.season}</div>                
              </div>
            </div>
          </div>
        ))}
      {openWinnerModel && (
        <MQModal
          onClose={() => setOpenWinnerModel(false)}
          modalHeader={`Winners of ${selectedYear}`}
          modalClassName="modal-80w"
        >
          <Winners year={selectedYear} />
        </MQModal>
      )}
    </>
  );
};
export default Seasons;
