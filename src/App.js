import { useState } from "react";
import "./App.css";
import mockData from "./data/mockData.json";
import { Table } from "./components/Table";

function App() {
  const data = mockData;
  console.log(data);
  const cities = ["Riga", "Jurmala", "Ventspils", "Daugavpils"];
  const [showSelect, setShowSelect] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("City");
  return (
    <div className="formContainer">
      <form>
        <input placeholder="Name" />
        <input placeholder="Surname" />
        <input placeholder="Age" />
        <div
          className="customDropdown"
          onClick={() => setShowSelect(!showSelect)}
        >
          {dropdownValue}
          {showSelect && (
            <div className="selectContainer">
              {cities.map((city) => {
                return (
                  <div
                    key={city}
                    onClick={() => {
                      setDropdownValue(city);
                    }}
                  >
                    {city}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="addButton">ADD</div>
      </form>
      <div className="tableContainer">
        <Table data={data} />
      </div>
    </div>
  );
}

export default App;
