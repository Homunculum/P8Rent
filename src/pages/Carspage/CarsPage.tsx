import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RentalModel } from "../../models/responses/RentalModel";
import RentalService from "../../services/RentalService";
import "./CarsPage.css";
import FilterCarCard from "../../components/FilterCarCard/FilterCarCard";

const CarsPage: React.FC = () => {
  // State hook'ları
  const [filteredRentals, setFilteredRentals] = useState<RentalModel[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);
  const location = useLocation(); // React Router'dan mevcut URL'yi alır.

  // Araçları filtreleyen fonksiyon
  const handleFilter = async () => {
    // URL'deki parametreleri al
    const params = new URLSearchParams(location.search);
    const filterStartDate = new Date(params.get("start") || "");

    try {
      // Tüm araçları getir
      const response = await new RentalService().getAll();
      console.log("response.data.data:", response.data.data);

      if (response.data && Array.isArray(response.data.data)) {
        // Başlangıç tarihine göre filtreleme
        let filtered = response.data.data.filter(
          (rental: RentalModel) =>
            rental.carResponse &&
            new Date(rental.returnDate) <= filterStartDate &&
            rental.returnDate !== null
        );

        // Fiyat aralığı belirleme
        const prices = filtered.map(
          (rental: RentalModel) => rental.carResponse.daily_price
        );
        setMinPrice(Math.min(...prices));
        setMaxPrice(Math.max(...prices));

        // Renk ve yıl seçeneklerini belirleme
        const uniqueColors = [
          ...new Set(
            filtered.map(
              (rental: RentalModel) => rental.carResponse.colorResponse.name
            )
          ),
        ];
        setColors(uniqueColors as string[]);
        const uniqueYears = [
          ...new Set(
            filtered.map((rental: RentalModel) => rental.carResponse.year)
          ),
        ];
        setYears(uniqueYears as number[]);

        // Kullanıcının seçtiği kriterlere göre yeniden filtreleme
        filtered = filtered.filter(
          (rental: RentalModel) =>
            (selectedColor
              ? rental.carResponse.colorResponse.name === selectedColor
              : true) &&
            (selectedYear ? rental.carResponse.year === selectedYear : true) &&
            (selectedMinPrice
              ? rental.carResponse.daily_price >= selectedMinPrice
              : true) &&
            (selectedMaxPrice
              ? rental.carResponse.daily_price <= selectedMaxPrice
              : true)
        );
        setFilteredRentals(filtered);
      } else {
        console.error(
          "Error: response.data.data is not an array:",
          response.data.data
        );
      }
    } catch (error) {
      console.error("Error filtering rentals:", error);
    }
  };

  // Sayfa yüklendiğinde veya URL parametreleri değiştiğinde filtreleme yap
  useEffect(() => {
    handleFilter();
  }, [location.search]);

  // Filtreleme butonuna tıklandığında filtreleme yap
  const handleFilterButtonClick = () => {
    handleFilter();
  };

  return (
    <div className="container">
      <h1>Filtered Cars</h1>

      {/* Filtreleme alanları */}
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

      {/* Filtrelenmiş araçlar */}
      <div className="row">
        {filteredRentals.map((rental) => (
          <div key={rental.carResponse.id} className="col-md-4 mb-4">
            <FilterCarCard car={rental.carResponse} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
