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
  const [data, setData] = useState({
    tableId: "original_table",
    tableData: [
      {
        id: "",
        name: "",
        surname: "",
        age: "",
        city: "",
      },
    ],
  });
  const [tableCopies, setTableCopies] = useState([]);

  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    surname: "",
    age: "",
    city: "",
  });

  useEffect(() => {
    setData((current) => ({
      tableId: current.tableId,
      tableData: mockedData,
    }));
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
    const updateData = [...data.tableData, newPerson];
    //setting new state
    setData((current) => ({
      tableId: current.tableId,
      tableData: updateData,
    }));
  };

  const handleOnSubmitEdit = () => {
    const editedData = data.tableData.map((obj) => {
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
    // setData(editedData);
    setData((current) => ({
      tableId: current.tableId,
      tableData: editedData,
    }));
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
    // 👇️ remove object that has id equal to target
    const filteredData = data.tableData.filter((person) => {
      return person.id !== targetId;
    });
    // set state with filtered array
    setData((current) => ({
      tableId: current.tableId,
      tableData: filteredData,
    }));
  };

  const handleCopyTable = () => {
    const newTableCopy = {
      tableId: v4(),
      tableData: JSON.parse(JSON.stringify(data.tableData)),
    };
    const updateData = [...tableCopies, newTableCopy];
    setTableCopies(updateData);
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
            data={data.tableData}
            handleDeleteRow={handleDeleteRow}
            handleEditRow={handleEditRow}
            handleCopyTable={handleCopyTable}
          />
          {tableCopies &&
            tableCopies.map((table) => {
              return (
                <div>
                  <Table
                    data={table.tableData}
                    handleDeleteRow={handleDeleteRow}
                    handleEditRow={handleEditRow}
                    handleCopyTable={handleCopyTable}
                  />
                </div>
              );
              // );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
