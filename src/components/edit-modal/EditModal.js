import React from "react";
import "./EditModal.css";
import { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export const EditModal = ({
  handleInputChange,
  addFormData,
  cities,
  handleDropdownChange,
  handleOnSubmit,
}) => {
  const [showSelect, setShowSelect] = useState(false);

  return (
    <div className="formContainer">
      <form>
        <input placeholder="Name" name="name" onChange={handleInputChange} />
        <input
          placeholder="Surname"
          name="surname"
          onChange={handleInputChange}
        />
        <input placeholder="Age" name="age" onChange={handleInputChange} />
        <div
          className="customDropdown"
          onClick={() => setShowSelect(!showSelect)}
          style={{ color: addFormData.city.length !== 0 && "black" }}
        >
          {addFormData.city.length === 0 ? "City" : addFormData.city}
          {showSelect && (
            <div className="selectContainer">
              {cities.map((city) => {
                return (
                  <div
                    key={city}
                    onClick={() => {
                      handleDropdownChange(city);
                    }}
                  >
                    {city}
                  </div>
                );
              })}
            </div>
          )}
          <div className="dropdownIcon">
            {!showSelect ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
        </div>

        <div
          className="addButton"
          onClick={() => {
            handleOnSubmit();
          }}
        >
          ADD
        </div>
      </form>
    </div>
  );
};
