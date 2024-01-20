import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import CarService from '../../services/CarService';
import { CarModel } from '../../models/responses/CarModel';

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarModel | null>(null);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = () => {
    let service: CarService = new CarService();
    service.getById(Number(id)).then(response => {
      setCar(response.data);
    });
  };

  if (!car) {
    // Loading spinner or message can be added here
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      
        <div className="col-6">
          <h2>{car.modelResponse.name}</h2>
          <p>Plate: {car.colorResponse.name}</p>
          <p>Year: {car.year}</p>
          <p>Price: ${car.daily_price}</p>
          <p>Kilometer: {car.kilometer}</p>
        </div>
      </div>
    </div>
    
  );
};

export default CarDetail;