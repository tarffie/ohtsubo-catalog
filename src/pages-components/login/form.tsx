"use client";

import React from "react";

export const Form = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { username, password } = formData;

    // need to hash password before working with them

    try {
      return;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <h2> Username </h2>
        <h2> Password </h2>
        <input
          onChange={handleChange}
          value={formData.username}
          type="text"
          name="username"
          id="username"
        />
        <input
          onChange={handleChange}
          value={formData.password}
          type="password"
          name="password"
          id="password"
        />
        <button type="submit"> fire in the hole! </button>
      </form>
    </div>
  );
};
