import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { CartModel } from '../../models/responses/CartModel';
import RentalService from '../../services/RentalService';
import CarService from '../../services/CarService';
import { CarModel } from '../../models/responses/CarModel';

const CartPage = () => {
  const { id } = useContext(AuthContext);
  const [rentals, setRentals] = useState<CartModel[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalData = await RentalService.prototype.getByCustomerId(String(id));
        if (!rentalData || !rentalData.data) {
          console.error("No rental data received");
          return;
        }

        const rentalWithCarDetails = await Promise.all(rentalData.data.map(async (rental: any) => {
          const carResponse = await CarService.prototype.getById(rental.carId);
          if (!carResponse || !carResponse.data) {
            console.error("No car data received for car id:", rental.carId);
            return rental;
          }
          const car: CarModel = carResponse.data.data;
          return {
            ...rental,
            carId: car.id,
            carName: car.modelResponse.name,
            carPlate: car.plate,
            dailyPrice: car.dailyPrice,
          };
        }));

        setRentals(rentalWithCarDetails);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };
    fetchRentals();
  }, [id]);

  return (
    <div className='container'>
      <h1>Aktive Rents</h1>
      <table>
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Plate</th>
            <th>Daily Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Start Kilometer</th>
          </tr>
        </thead>
        <tbody>
          {rentals.filter(rental => rental.returnDate === null).map((rental, index) => (
            <tr key={index}>
              <td>{rental.carName}</td>
              <td>{rental.carPlate}</td>
              <td>{rental.dailyPrice}</td>
              <td>{rental.startDate.toString()}</td>
              <td>{rental.endDate.toString()}</td>
              <td>{rental.startKilometer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Past Rents</h1>
      <table>
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Plate</th>
            <th>Daily Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Start Kilometer</th>
          </tr>
        </thead>
        <tbody>
          {rentals.filter(rental => rental.returnDate !== null).map((rental, index) => (
            <tr key={index}>
              <td>{rental.carName}</td>
              <td>{rental.carPlate}</td>
              <td>{rental.dailyPrice}</td>
              <td>{rental.startDate.toString()}</td>
              <td>{rental.endDate.toString()}</td>
              <td>{rental.startKilometer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
