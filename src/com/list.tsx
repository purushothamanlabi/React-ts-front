import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import helloConfig from "../toastConfig";
import "../css/list.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import URL from "../fetchHook/baseURL";

const List = () => {
  const navigate = useNavigate();

  interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    created_at: string;
  }

  const CustomButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return <Button label="Custom Button" onClick={onClick} />;
  };

  const [data, setData] = useState<User[]>([]);

  // console.log("List", data);

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const response = await fetch(`${URL}/users`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json: User[] = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data!", helloConfig);
      }
    }
    getData();
  }, []);

  






  const handleButtonClick = async (rowData: User) => {
    try {
      console.log(rowData.id);
  
      const response = await fetch(
        `${URL}/deleteuser/${rowData.id}`,
        {
          method: "DELETE",
        }

      );
  
      if (!response.ok) {
       
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      toast.success("Data deleted successfully", helloConfig);
  
      // Update the data after successful deletion
      setData(data.filter((user) => user.id !== rowData.id));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete data", helloConfig);
    }
  };
  

  const editbtn = async (rawData: any) => {
    navigate(`/edit/${rawData.id}`);
  };

  return (
    <div className="list-container">
      <h3>CRUD operation using React with typesctipt</h3>
      <DataTable
        value={data}
        tableStyle={{ minWidth: "40rem", border: "solid black 1px" }}
      >
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="age" header="Age"></Column>
        <Column
          body={(rowData) => (
          

            <button className="datatebtn" onClick={() => handleButtonClick(rowData)} >delete</button>
          )}
          header="delete"
        >
          Delete
        </Column>
        <Column
          body={(rowData) => 
          
          <button className="editbtn" onClick={() => editbtn(rowData)} >edit </button>
        
        }
          header="edit"
        ></Column>
      </DataTable>


      <div className="card flex justify-content-center">
        <button>
          <Link to="/form">add new data</Link>
        </button>
      </div>
    </div>
  );
};

export default List;
