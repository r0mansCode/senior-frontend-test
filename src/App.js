import { useState, useEffect } from "react";
import "./App.css";
import mockData from "./data/mockData.json";
import { Table } from "./components/Table";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { uuid as uuidv4 } from "uuidv4";

function App() {
  const mockedData = mockData;
  const cities = ["Riga", "Jurmala", "Ventspils", "Daugavpils"];
  const [showSelect, setShowSelect] = useState(false);
  const [data, setData] = useState([
    {
      // id: "",
      name: "",
      surname: "",
      age: "",
      city: "",
    },
  ]);

  const [addFormData, setAddFormData] = useState({
    // id: "",
    name: "",
    surname: "",
    age: "",
    city: "",
  });

  useEffect(() => {
    setData(mockedData);
  }, []);

  useEffect(() => {
    console.log(addFormData);
  }, [addFormData]);

  const handleOnSubmit = () => {
    //creating new person object
    const newPerson = {
      // id: uuidv4,
      name: addFormData.name,
      surname: addFormData.surname,
      age: addFormData.age,
      city: addFormData.city,
    };
    // adding new person into data array
    const updateData = [...data, newPerson];
    //setting new state
    setData(updateData);
  };

  const handleInputChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleDropdownChange = (item) => {
    const fieldName = "city";

    const newFormData = { ...addFormData };
    newFormData["city"] = item;

    setAddFormData(newFormData);
  };

  const handleDeleteRow = (targetName) => {
    setData((current) =>
      current.filter((person) => {
        // 👇️ remove object that has id equal to 2
        return person.name !== targetName;
      })
    );
  };

  return (
    <>
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
      <Table data={data} handleDeleteRow={handleDeleteRow} />
    </>
  );
}

export default App;
