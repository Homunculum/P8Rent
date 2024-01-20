import React, { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import CarService from '../../services/CarService';
import { CarModel } from '../../models/responses/CarModel';
import Carimg from '../../assets/cards.jpg'


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
      <div className="row">
    {car && car ? (
      
      <div className="col-6">
        <h2>{car.modelResponse?.name}</h2>
        <img src={Carimg} alt={car.modelResponse.name} style={{ width: '100%' }} />
        <p>Daily Price: {car.daily_price}</p>
        <p>Kilometer: {car.kilometer}</p>
        <p>Year: {car.year}</p>
        <p>Color: {car.colorResponse?.name}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
    </div>
  </div>
  );
};

export default CarDetail;