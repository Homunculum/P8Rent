// Productpage.tsx

import React, { useEffect, useState } from 'react';
import { CarsModel } from '../../models/responses/CarsModel';
import CarCard from '../../components/CarCard/CarCard';
import CarService from '../../services/CarService';

type Props = {};

const Productpage: React.FC<Props> = () => {
  const [cars, setCars] = useState<CarsModel[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await new CarService().getAll();
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>All Cars</h1>
      <div className="row">
        {cars.map((car) => (
          <div key={car.id} className="col-md-3 mb-4">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Productpage;
