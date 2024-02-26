import React, { useState, useEffect } from "react";
import CarService from "../../services/CarService";
import "./CarsPage.css";
import FilterCarCard from "../../components/FilterCarCard/FilterCarCard";

const CarsPage: React.FC = () => {
  
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);

  
  const handleFilter = async () => {
    try {
      const response = await new CarService().getAll();
      console.log("response.data:", response.data);
  
      if (response.data.data && Array.isArray(response.data.data)) {
        let filtered = response.data.data.filter(
          (car: any) => car.carState === "AVAILABLE"
        );
  
        const prices = filtered.map((car: any) => car.dailyPrice);
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));
  
        const uniqueColors = [...new Set(filtered.map((car: any) => car.colorResponse.name))];
        setColors(uniqueColors as string[]);
        const uniqueYears = [...new Set(filtered.map((car: any) => car.year))];
        setYears(uniqueYears as number[]);
  
        filtered = filtered.filter(
          (car: any) =>
            (selectedColor ? car.colorResponse.name === selectedColor : true) &&
            (selectedYear ? car.year === selectedYear : true) &&
            (selectedMinPrice ? car.dailyPrice >= selectedMinPrice : true) &&
            (selectedMaxPrice ? car.dailyPrice <= selectedMaxPrice : true)
        );
        setFilteredCars(filtered);
      } else {
        console.error("Error: response.data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error filtering cars:", error);
    }
  };

  
  const handleFilterButtonClick = () => {
    handleFilter();
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <div className="container">
      <h1>Filtered Cars</h1>

      <div className="d-flex">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="colorSelect">
              Color
            </label>
          </div>
          <select
            className="custom-select"
            id="colorSelect"
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option selected>Choose...</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="yearSelect">
              Year
            </label>
          </div>
          <select
            className="custom-select"
            id="yearSelect"
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option selected>Choose...</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={`Min Price: ${minPrice}`}
            aria-label="MinPrice"
            aria-describedby="minPriceButton"
            onChange={(e) => setSelectedMinPrice(Number(e.target.value))}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={`Max Price: ${maxPrice}`}
            aria-label="MaxPrice"
            aria-describedby="maxPriceButton"
            onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
          />
        </div>
        <div className="input-group mb-3">
          <button type="button" onClick={handleFilterButtonClick}>
            Filter
          </button>
        </div>
      </div>

      <div className="row">
        {filteredCars.map((car: any) => (
          <div key={car.id} className="col-md-4 mb-4 bg-transparent">
            <FilterCarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
