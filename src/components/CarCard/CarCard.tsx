
import React from 'react';
import { CarsModel } from '../../models/responses/CarsModel';
import { Link } from 'react-router-dom';
import './CarCard.css';
import Carimg from '../../assets/cards.jpg'


interface CarCardProps {
  car: CarsModel;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="card card--car card--car--new offers__card">
    <div className="card-body d-flex flex-column h-100">
      <h4 className="text-style text-style--h3 text-style--h3-xl card__title">{car.modelResponse.name}</h4>
      <img src={Carimg} alt={car.modelResponse.name} style={{ width: '100%' }} />
      <p className="card-text">Year: {car.year}</p>
      <p className="card-text">Kilometer: {car.kilometer}</p>
      <p className="card-text">Daily Price: {car.daily_price}</p>
      <p className="card-text">Color: {car.colorResponse.name}</p>
      <Link
            className="btn btn-success"
            to={`/car/${car.id}`}  // Use template literal to include the product ID
            role="button"
          >
            Detail
          </Link>
    </div>
  </div>
);
};


export default CarCard;
