import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarService from '../../services/CarService';
import { CarModel } from '../../models/responses/CarModel';
import CarImg from '../../assets/CarImage/car.jpg'
import { FaCalendarTimes, FaMoneyBill} from "react-icons/fa";
import { IoIosSpeedometer, IoIosColorPalette  } from "react-icons/io";


import './CarDetails.css'


const CarDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [car, setCar] = useState<CarModel | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (id) {
          const response = await new CarService().getById(parseInt(id, 10));
const carData: CarModel = response.data.data; 
setCar(carData);
        } else {
          console.error('Car ID is undefined');
        }
      } catch (error) {
        console.error('Error fetching car details:', error);
        
      }
    };

    fetchCarDetails();
  }, [id]);

  console.log('car:', car);

  return (
    <div className="vehicleDetails">
    {car && (
      <div>
        <div className="vehicle-details-header-div">
          <h4 className="text-style text-style--h3 text-style--h3-xl card__title">
            {car.modelResponse.name}
          </h4>
        </div>
        <div className="vehicle-details-img-container">
          <img src={car.imagePath} alt={car.modelResponse.name} />
        </div>
        <div className="content-container">
          
            <p className="details-text">
              {" "}
              <FaCalendarTimes /> Year: {car.year}
            </p>
            <p className="details-text">
              {" "}
              <IoIosSpeedometer /> Kilometer: {car.kilometer}
            </p>
            <p className="details-text">
              {" "}
              <FaMoneyBill /> Daily Price: {car.dailyPrice}
            </p>
            <p className="details-text">
              {" "}
              <IoIosColorPalette /> Color: {car.colorResponse.name}
            </p>
          
          
        </div>
      </div>
    )}
  </div>
  );
};


export default CarDetail;