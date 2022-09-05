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
  const [tableId, setTableId] = useState();
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

  useEffect(() => {
    console.log(tableCopies)
  }, [tableCopies])

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

  const handleEditOriginalTableRow = (targetId) => {
    setRowId(targetId);
    setEditCopy(false)
    setShowModal(true);
  };

  const handleEditRow = (targetId, tableId) => {
    setRowId(targetId);
    setTableId(tableId)
    setEditCopy(true)
    setShowModal(true);
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

  const handleOnSubmitEditCopy = () => {
    const editedTableData = tableCopies.map((table, ind) => {
      if (table.tableId === tableId) return tableCopies[ind].tableData.map((obj) => {
        if (obj.id === rowId)
          return {
            ...obj,
            name: addFormData.name,
            surname: addFormData.surname,
            age: addFormData.age,
            city: addFormData.city,
        };
        else return obj;
      }) 
      else return table
    })

    // const editedData = tableCopies.tableData.map((obj) => {
    //   if (obj.id === rowId)
    //     return {
    //       ...obj,
    //       name: addFormData.name,
    //       surname: addFormData.surname,
    //       age: addFormData.age,
    //       city: addFormData.city,
    //     };
    //   else return obj;
    // });
    // setData(editedData);
    // setData((current) => ({
    //   tableId: current.tableId,
    //   tableData: editedData,
    // }));

    // setTableCopies(editedTableData)
    console.log(editedTableData)
    setShowModal(false);
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
    const findTableId = tableCopies.find(table => table.tableId === event.currentTarget.id)
    const newTableCopy = {
      tableId: v4(),
      tableData: JSON.parse(JSON.stringify(findTableId.tableData)),
    };
    const updateData = [...tableCopies, newTableCopy];
    setTableCopies(updateData);
  };

  const handleDeleteTable = (event) => {
    const filteredData = tableCopies.filter((table) => {
      return table.tableId !== event.currentTarget.id;
    });
    setTableCopies(filteredData);
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
            handleOnSubmit={!editCopy ? handleOnSubmitEdit : handleOnSubmitEditCopy}
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
            handleEditRow={handleEditOriginalTableRow}
            handleCopyTable={handleCopyOriginalTable}
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
