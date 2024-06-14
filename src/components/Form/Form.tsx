"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface FormData {
  name: string;
}

const FormData: React.FC = () => {
  // Changed the component name to avoid conflict with the interface name
  const [formData, setFormData] = useState<FormData>({ name: "" });
  const [storedData, setStoredData] = useState<FormData[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load data from localStorage when component mounts
    const data = localStorage.getItem("formData");
    if (data) {
      setStoredData(JSON.parse(data));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Check if the name field is not empty
  if (!formData.name.trim()) {
    return; // Prevent form submission if name is empty
  }

  // Get current data from localStorage
  const data = localStorage.getItem("formData");
  const formDataArray: FormData[] = data ? JSON.parse(data) : [];

  // Add new data to the array
  formDataArray.push(formData);

  // Save updated array to localStorage
  localStorage.setItem("formData", JSON.stringify(formDataArray));

  // Update state to display data
  setStoredData(formDataArray);

  // Redirect to the search page with the name parameter
  router.push(`/seek/search=${formData.name}`);

  // Reset form
  setFormData({ name: "" });
};


  const handleDelete = (index: number) => {
    // Copy the current data array
    const updatedData = [...storedData];

    // Remove the item at the specified index
    updatedData.splice(index, 1);

    // Update localStorage
    localStorage.setItem("formData", JSON.stringify(updatedData));

    // Update state to display data
    setStoredData(updatedData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Stored Data</h2>
      <ul>
        {storedData.map((data, index) => (
          <li key={index}>
            <span onClick={() => router.push(`/seek/search=${data.name}`)}>
              {data.name}
            </span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FormData; // Export the correctly named component
