import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import CarService from '../../services/CarService';
import { CarModel } from '../../models/responses/CarModel';

import './CarDetails.css'


const CarDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [car, setCar] = useState<CarModel | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (id) {
          const response = await new CarService().getById(parseInt(id, 10));
const carData: CarModel = response.data.data; // Veriyi doğru şekilde ayıklama
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
    <div className="container">
      <div className="row justify-content-center">
        {car && car ? (
          <div className="col-6">
            <div className="card">
              <img src={"assets/CarImage/car.jpg"} className="card-img-top" alt={car.modelResponse?.name} />
              <div className="card-body">
                <h2 className="card-title">{car.modelResponse?.name}</h2>
                <p className="card-text">Daily Price: {car.daily_price}</p>
                <p className="card-text">Kilometer: {car.kilometer}</p>
                <p className="card-text">Year: {car.year}</p>
                <p className="card-text">Color: {car.colorResponse?.name}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};


export default CarDetail;