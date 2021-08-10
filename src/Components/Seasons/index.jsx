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
          <Card style={{ width: "18rem" }} key={index}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{item.season}</Card.Title>
              <Button
                variant="primary"
                onClick={() => {
                  openModel(item.season);
                }}
              >
                More Details
              </Button>
            </Card.Body>
          </Card>
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
