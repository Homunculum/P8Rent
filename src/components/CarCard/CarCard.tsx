import React from "react";
import { CarModel } from "../../models/responses/CarModel";
import { Link } from "react-router-dom";
import "./CarCard.css";
import { FaCalendarTimes, FaMoneyBill} from "react-icons/fa";
import { IoIosSpeedometer, IoIosColorPalette  } from "react-icons/io";

interface CarCardProps {
  car: CarModel;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
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
          <p className="card-text">
            <FaCalendarTimes  /> Year: {car.year}</p>
          <p className="card-text"> <IoIosSpeedometer /> Kilometer: {car.kilometer}</p>
          <p className="card-text"> <FaMoneyBill /> Daily Price: {car.daily_price}</p>
          <p className="card-text"> <IoIosColorPalette /> Color: {car.colorResponse.name}</p>
        </div>
        <div className="vehicle-card-btn-container">
          <Link className="btn" to={`/car/${car.id}`} role="button">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
