import { useState, useEffect } from "react";
import "./App.css";
import mockData from "./data/mockData.json";
import { Table } from "./components/table/Table";
import { EditModal } from "./components/edit-modal/EditModal";
import { v4 } from "uuid";

function App() {
  const mockedData = mockData;
  const cities = ["Riga", "Jurmala", "Ventspils", "Daugavpils"];
  const [showModal, setShowModal] = useState(false);
  const [rowId, setRowId] = useState();
  const [data, setData] = useState([
    {
      id: "",
      name: "",
      surname: "",
      age: "",
      city: "",
    },
  ]);

  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    surname: "",
    age: "",
    city: "",
  });

  useEffect(() => {
    setData(mockedData);
  }, []);

  const handleOnSubmitAdd = () => {
    //creating new person object
    const newPerson = {
      id: v4(),
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

  const handleOnSubmitEdit = () => {
    const editedData = data.map((obj) => {
      if (obj.id === rowId)
        return {
          ...obj,
          name: addFormData.name,
          surname: addFormData.surname,
          age: addFormData.age,
          city: addFormData.city,
        };
      else return obj;
    });
    setData(editedData);
    setShowModal(false);
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

  const handleDeleteRow = (targetId) => {
    setData((current) =>
      current.filter((person) => {
        // 👇️ remove object that has id equal to target
        return person.id !== targetId;
      })
    );
  };

  const handleEditRow = (targetId) => {
    setRowId(targetId);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <div className="editModalContainer">
          <EditModal
            handleInputChange={handleInputChange}
            addFormData={addFormData}
            cities={cities}
            handleDropdownChange={handleDropdownChange}
            handleOnSubmit={handleOnSubmitEdit}
          />
        </div>
      )}
      <div className="appContainer">
        <div>
          <EditModal
            handleInputChange={handleInputChange}
            addFormData={addFormData}
            cities={cities}
            handleDropdownChange={handleDropdownChange}
            handleOnSubmit={handleOnSubmitAdd}
          />
          <Table
            data={data}
            handleDeleteRow={handleDeleteRow}
            handleEditRow={handleEditRow}
          />
        </div>
      </div>
    </>
  );
}

export default App;
