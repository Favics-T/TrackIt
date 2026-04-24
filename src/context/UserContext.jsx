import React, { createContext, useState,useContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    phoneNumber: '',
    emailAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFullName = (e)=>{
    setFullName(e.target.value)
  }

 

  const submit =()=>{

  }


  return (
    <UserContext.Provider value={{ formData, handleChange }}>
      {children}
    </UserContext.Provider>
  );
}

