import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarService from "../../services/CarService";
import { CarModel } from "../../models/responses/CarModel";
import "./Rent.css";
import { FaCalendarTimes, FaMoneyBill } from "react-icons/fa";
import { IoIosSpeedometer, IoIosColorPalette } from "react-icons/io";
import { AuthContext } from "../../contexts/AuthContext";
import RentalService from "../../services/RentalService";

const Rent: React.FC = () => {
  const [car, setCar] = useState<CarModel | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [name, setName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [rentalPrice, setRentalPrice] = useState<number>(0);

  const navigate = useNavigate();
  const { id } = useParams();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (id) {
          const response = await new CarService().getById(parseInt(id, 10));
          const carData: CarModel = response.data.data;
          setCar(carData);
        } else {
          console.error("Car ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    if (car && authContext.filterStartDate && authContext.filterEndDate) {
      const startDate = new Date(authContext.filterStartDate);
      const endDate = new Date(authContext.filterEndDate);
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalPrice = daysDiff * car.dailyPrice;
      setRentalPrice(totalPrice);
    }
  }, [car, authContext.filterStartDate, authContext.filterEndDate]);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleRent = async () => {
    if (paymentMethod === "card") {
      if (
        !name ||
        !cardNumber ||
        !expiryMonth ||
        !expiryYear ||
        !cvv
      ) {
        alert("Please enter all credit card information");
        return;
      }
    }

    try {
      const { id: userId, filterStartDate, filterEndDate } = authContext;

      const rentalData = {
        startDate: filterStartDate || "",
        endDate: filterEndDate || "",
        discount: 0,
        carId: parseInt(id || "0", 10),
        customerId: parseInt(userId || "0", 10),
        employeeId: Math.floor(Math.random() * 4) + 1,
        userId: parseInt(userId || "0", 10),
      };

      await new RentalService().addRent(rentalData);

      alert("Car rental process has been successfully completed.");
      navigate("/");
    } catch (error) {
      console.error("Error renting car:", error);
      alert("An error occurred during the car rental process.");
    }
  };

  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const monthNumber = index + 1;
    return (
      <option key={monthNumber} value={String(monthNumber)}>
        {monthNumber}
      </option>
    );
  });

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 12 }, (_, index) => {
    const year = currentYear + index;
    return (
      <option key={year} value={String(year)}>
        {year}
      </option>
    );
  });

  
  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container">
      <h1 className="text-center">Rent Car</h1>
      {car && (
        <div className="row">
          <div className="car">
            <div className="card">
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
            </div>
          </div>
          <div className="payment">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Payment</h5>
                <p>Total Price: {rentalPrice}</p> 
                <p>Start Date: {authContext.filterStartDate ? formatDateString(authContext.filterStartDate) : ''}</p> 
                <p>End Date: {authContext.filterEndDate ? formatDateString(authContext.filterEndDate) : ''}</p> 
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="cash"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => handlePaymentMethodChange("cash")}
                  />
                  <label className="form-check-label" htmlFor="cash">
                    Cash
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => handlePaymentMethodChange("card")}
                  />
                  <label className="form-check-label" htmlFor="card">
                    Credit Card
                  </label>
                </div>
                {paymentMethod === "card" && (
                  <div>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label>Expiry Month</label>
                        <select
                          className="form-control"
                          value={expiryMonth}
                          onChange={(e) => setExpiryMonth(e.target.value)}
                        >
                          <option value="">Select Month</option>
                          {monthOptions}
                        </select>
                      </div>
                      <div className="form-group col-md-6">
                        <label>Expiry Year</label>
                        <select
                          className="form-control"
                          value={expiryYear}
                          onChange={(e) => setExpiryYear(e.target.value)}
                        >
                          <option value="">Select Year</option>
                          {yearOptions}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <button className="btn btn-primary" onClick={handleRent}>
                  Rent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rent;
