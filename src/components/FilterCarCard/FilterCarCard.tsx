import React, { useContext, useState } from "react";
import { CarModel } from "../../models/responses/CarModel";
import { Link } from "react-router-dom";
import "./FilterCarCard.css";
import { FaCalendarTimes, FaMoneyBill} from "react-icons/fa";
import { IoIosSpeedometer, IoIosColorPalette  } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import Login from "../Login/Login";

interface FilterCarCardProps {
  car: CarModel;
}

const FilterCarCard: React.FC<FilterCarCardProps> = ({ car }) => {
  const authContext: any = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRent = () => {
    if (!authContext.isAuthenticated) {
      alert("Lütfen ilk giriş yapınız");
      setShowLoginModal(true);
    }
  };

  return (
    <div className="card card--car card--car--new offers__card vehicleCard">
      <div className="vehicle-card-header-div">
        <h4 className="text-style text-style--h3 text-style--h3-xl card__title">
          {car.modelResponse.name}
        </h4>
      </div>
      <div className="vehicle-card-img-container">
        <img src={"assets/CarImage/car.jpg"} alt={car.modelResponse.name} />
      </div>
      <div className="content-container">
        <div className="vehicle-card-description-container">
          <p className="card-text"> <FaCalendarTimes/> Year: {car.year}</p>
          <p className="card-text"><IoIosSpeedometer/> Kilometer: {car.kilometer}</p>
          <p className="card-text"><FaMoneyBill/> Daily Price: {car.daily_price}</p>
          <p className="card-text"><IoIosColorPalette/> Color: {car.colorResponse.name}</p>
        </div>
        {authContext.isAuthenticated ? (
          <Link className="btn btn-success" to={`/car/${car.id}`} onClick={handleRent}>
            Hemen Kirala
          </Link>
        ) : (
          <button className="btn btn-success" onClick={handleRent}>
            Hemen Kirala
          </button>
        )}
      </div>
      {showLoginModal && <Login />}
    </div>
  );
};

export default FilterCarCard;
