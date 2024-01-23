import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RentalModel } from '../../models/responses/RentalModel';
import RentalService from '../../services/RentalService';
import CarCard from '../../components/CarCard/CarCard';


const CarsPage: React.FC = () => {
  const [filteredRentals, setFilteredRentals] = useState<RentalModel[]>([]);
  const location = useLocation();

  const handleFilter = async () => {
    const params = new URLSearchParams(location.search);
    const filterStartDate = new Date(params.get('start') || '');
    const filterEndDate = new Date(params.get('end') || '');

    try {
      const response = await new RentalService().getAll();
      console.log('response.data.data:', response.data.data);
      if (response.data && Array.isArray(response.data.data)) {
        const filtered = response.data.data.filter((rental: RentalModel) => 
          new Date(rental.returnDate) <= filterStartDate && rental.returnDate !== null
        );
        setFilteredRentals(filtered);
        console.log('startDate:', filterStartDate); 
        console.log('endDate:', filterEndDate); 
        console.log('filtered:', filtered); 
      } else {
        console.error('Error: response.data.data is not an array:', response.data.data);
      }
    } catch (error) {
      console.error('Error filtering rentals:', error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, [location]);

  return (
    <div className="container">
      <h1>Filtered Cars</h1>
      <div className="row">
        {filteredRentals.map((rental) => (
          <div key={rental.carResponse.id} className="col-md-3 mb-4">
            <CarCard car={rental.carResponse} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;