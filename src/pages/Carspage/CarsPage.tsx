

import React, { useEffect, useState } from 'react';
import { CarsModel } from '../../models/responses/CarsModel';
import CarCard from '../../components/CarCard/CarCard';
import CarService from '../../services/CarService';

type Props = {};

const CarsPage: React.FC<Props> = () => {
  const [filteredCars, setFilteredCars] = useState<CarsModel[]>([]);
  const [startYear, setStartYear] = useState<number>(2015);
  const [endYear, setEndYear] = useState<number>(2024);

  const handleFilter = async () => {
    try {
      const response = await new CarService().getAll();
      if (response.data && Array.isArray(response.data.data)) {
        const filtered = response.data.data.filter((car: CarsModel) => car.year >= startYear && car.year <= endYear);
        setFilteredCars(filtered);
      } else {
        console.error('Error: response.data.data is not an array:', response.data.data);
      }
    } catch (error) {
      console.error('Error filtering cars:', error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [startYear, endYear]);

  return (<div className="container">
    <div >
  <h1>Filtered Cars</h1>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <div>
      <label>Start Year:</label>
      <input type="number" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} />
    </div>
    <div>
      <label>End Year:</label>
      <input type="number" value={endYear} onChange={(e) => setEndYear(Number(e.target.value))} />
    </div>
    <button onClick={handleFilter}>Filter</button>
  </div>
  
  <div className="row" >
    {filteredCars.map((car) => (
      <div key={car.id} className="col-md-3 mb-4">
        <CarCard car={car} />
      </div>
    ))}
  </div>
  </div>
</div>
);
};


export default CarsPage;
