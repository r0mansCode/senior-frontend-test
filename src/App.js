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
  const [searchTableId, setTableId] = useState();
  const [editCopy, setEditCopy] = useState(false);
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
    const newPerson = {
      id: v4(),
      name: addFormData.name,
      surname: addFormData.surname,
      age: addFormData.age,
      city: addFormData.city,
    };
    const updateData = [...data.tableData, newPerson];
    const addFormArray = [
      addFormData.name.replace(/ /g, "").length,
      addFormData.surname.replace(/ /g, "").length,
      addFormData.age.replace(/ /g, "").length,
      addFormData.city.replace(/ /g, "").length,
    ];
    console.log(addFormArray);
    function checkLength(param) {
      return param > 0;
    }
    const isFormCompleted = addFormArray.every(checkLength);
    isFormCompleted
      ? setData((current) => ({
          tableId: current.tableId,
          tableData: updateData,
        }))
      : alert("Please fill out all the fields");
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

  const handleDeleteOriginalTableRow = (targetId) => {
    const filteredData = data.tableData.filter((person) => {
      return person.id !== targetId;
    });
    setData((current) => ({
      tableId: current.tableId,
      tableData: filteredData,
    }));
  };

  const handleDeleteRow = (targetId, searchTableId) => {
    setTableId(searchTableId);
    const filteredTablesArray = tableCopies.map((table, ind) => {
      if (table.tableId === searchTableId) {
        const editedData = tableCopies[ind].tableData.filter((person) => {
          return person.id !== targetId;
        });
        const newTable = {
          tableId: table.tableId,
          tableData: editedData,
        };
        return newTable;
      } else return table;
    });
    setTableCopies(filteredTablesArray);
  };

  const handleEditOriginalTableRow = (targetId) => {
    setRowId(targetId);
    setEditCopy(false);
    setShowModal(true);
  };

  const handleEditRow = (targetId, searchTableId) => {
    setRowId(targetId);
    setTableId(searchTableId);
    setEditCopy(true);
    setShowModal(true);
  };

  function checkLength(param) {
    return param > 0;
  }

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
    const addFormArray = [
      addFormData.name.replace(/ /g, "").length,
      addFormData.surname.replace(/ /g, "").length,
      addFormData.age.replace(/ /g, "").length,
      addFormData.city.replace(/ /g, "").length,
    ];

    const isFormCompleted = addFormArray.every(checkLength);
    isFormCompleted
      ? setData((current) => ({
          tableId: current.tableId,
          tableData: editedData,
        }))
      : alert("Please fill out all the fields");
    isFormCompleted && setShowModal(false);
    isFormCompleted &&
      setAddFormData({ id: "", name: "", surname: "", age: "", city: "" });
  };

  const handleOnSubmitEditCopy = () => {
    const editedTable = tableCopies.map((table, ind) => {
      if (table.tableId === searchTableId) {
        const editedData = tableCopies[ind].tableData.map((obj) => {
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
        const newTable = {
          tableId: table.tableId,
          tableData: editedData,
        };
        return newTable;
      } else return table;
    });
    const addFormArray = [
      addFormData.name.replace(/ /g, "").length,
      addFormData.surname.replace(/ /g, "").length,
      addFormData.age.replace(/ /g, "").length,
      addFormData.city.replace(/ /g, "").length,
    ];

    const isFormCompleted = addFormArray.every(checkLength);
    isFormCompleted
      ? setTableCopies(editedTable)
      : alert("Please fill out all the fields");
    isFormCompleted && setShowModal(false);
    isFormCompleted &&
      setAddFormData({ id: "", name: "", surname: "", age: "", city: "" });
  };

  const handleCopyOriginalTable = (id) => {
    const newTableCopy = {
      tableId: v4(),
      tableData: JSON.parse(JSON.stringify(data.tableData)),
    };
    const updateData = [...tableCopies, newTableCopy];
    setTableCopies(updateData);
  };

  const handleCopyTable = (event) => {
    const findTable = tableCopies.find(
      (table) => table.tableId === event.currentTarget.id
    );
    const newTableCopy = {
      tableId: v4(),
      tableData: JSON.parse(JSON.stringify(findTable.tableData)),
    };
    const updateData = [...tableCopies, newTableCopy];
    setTableCopies(updateData);
  };

  const handleDeleteOriginalTable = () => {
    alert("Original table can not be deleted");
  };

  const handleDeleteTable = (event) => {
    const filteredTableArray = tableCopies.filter(
      (table) => table.tableId !== event.currentTarget.id
    );
    setTableCopies(filteredTableArray);
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
            handleOnSubmit={
              !editCopy ? handleOnSubmitEdit : handleOnSubmitEditCopy
            }
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
            handleDeleteRow={handleDeleteOriginalTableRow}
            handleEditRow={handleEditOriginalTableRow}
            handleCopyTable={handleCopyOriginalTable}
            handleDeleteTable={handleDeleteOriginalTable}
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
                    tableId={table.tableId}
                    handleDeleteTable={handleDeleteTable}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
