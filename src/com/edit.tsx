import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import helloConfig from "../toastConfig";
import "../css/edit.css";
import URL from "../fetchHook/baseURL";

const Edit: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); // to get the user ID from URL params
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${URL}/users/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setName(data.name);
        setAge(data.age);
        setEmail(data.email);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedAge = parseInt(e.target.value, 10);
    setAge(isNaN(parsedAge) ? undefined : parsedAge);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/updateuser/${id}`, {
        method: "PUT", // Use PUT method to update the user data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.info("User updated successfully!", helloConfig);
      navigate("/list"); // Navigate back to the list page after successful update
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user!");
    }
  };

  const emailedit = () => {
    toast.warn("email cant update", helloConfig);
  };

  

  return (
    <div className="edit-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <InputText
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        />

        <label htmlFor="age">Age:</label>
        <InputText
          id="age"
          name="age"
          value={age !== undefined ? age.toString() : ""}
          onChange={handleAgeChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <div onClick={emailedit} style={{ cursor: "pointer" }}>
          <InputText
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            disabled
          />
        </div>

        <button type="submit">Update</button>
      </form>

      <button>
        <Link to="/list">back to home</Link>
      </button>
    </div>
  );
};

export default Edit;
