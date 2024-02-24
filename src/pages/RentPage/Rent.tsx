import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarService from "../../services/CarService";
import { CarModel } from "../../models/responses/CarModel";
import "./Rent.css";
import { FaCalendarTimes, FaMoneyBill } from "react-icons/fa";
import { IoIosSpeedometer, IoIosColorPalette } from "react-icons/io";

const Rent: React.FC = () => {
  const [car, setCar] = useState<CarModel | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [name, setName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  const navigate = useNavigate();
  const { id } = useParams();

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
