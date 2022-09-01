import { useState, useEffect } from "react";
import "./App.css";
import mockData from "./data/mockData.json";
import { Table } from "./components/table/Table";
import { EditModal } from "./components/edit-modal/EditModal";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { v4 } from "uuid";

function App() {
  const mockedData = mockData;
  const cities = ["Riga", "Jurmala", "Ventspils", "Daugavpils"];
  const [showSelect, setShowSelect] = useState(false);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOnSubmit = () => {
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

  // const handleEditRow = (targetId) => {
  //   const editedData = data.map((obj) => {
  //     if (obj.id === targetId) return { ...obj, name: "Modest" };
  //     else return obj;
  //   });
  //   setData(editedData);
  // };

  return (
    <>
      <EditModal
        handleInputChange={handleInputChange}
        addFormData={addFormData}
        cities={cities}
        handleDropdownChange={handleDropdownChange}
        handleOnSubmit={handleOnSubmit}
      />
      <Table
        data={data}
        handleDeleteRow={handleDeleteRow}
        // handleEditRow={handleEditRow}
      />
    </>
  );
}

export default App;
