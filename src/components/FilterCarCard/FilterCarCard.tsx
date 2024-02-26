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
    <div className="filterCard">
      <div className="filter-card-header-div">
        <h4 className="text-style text-style--h3 text-style--h3-xl card__title">
          {car.modelResponse.name}
        </h4>
      </div>
      <div className="filter-card-img-container">
        <img src={car.imagePath} alt={car.modelResponse.name} />
      </div>
      <div className="content-container">
        <div className="filter-card-description-container">
          <p className="card-text"> <FaCalendarTimes/> Year: {car.year}</p>
          <p className="card-text"><IoIosSpeedometer/> Kilometer: {car.kilometer}</p>
          <p className="card-text"><FaMoneyBill/> Daily Price: {car.dailyPrice}</p>
          <p className="card-text"><IoIosColorPalette/> Color: {car.colorResponse.name}</p>
        </div>
        {authContext.isAuthenticated ? (
           <div className="filter-card-btn-container">
          <Link className="btn" to={`/rent/${car.id}`} onClick={handleRent}>
            Hemen Kirala
          </Link>
          </div>
        ) : ( <div className="filter-card-btn-container">
          <button className="btn" onClick={handleRent}>
            Hemen Kirala
          </button>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default FilterCarCard;
