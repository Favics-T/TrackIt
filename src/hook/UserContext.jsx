import React, { createContext, useState,useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    number: '',
    email: 'hllo@gmail.com'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
// console.log(formData)
  return (
    <UserContext.Provider value={{ formData, handleChange }}>
      {children}
    </UserContext.Provider>
  );
}
