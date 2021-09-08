import React from "react";

export const PersonForm = ({
  name,
  nameHandler,
  number,
  numberHandler,
  addPerson,
}) => {
  const handleNameChange = (event) => {
    nameHandler(event.target.value);
  };
  const handleNumberChange = (event) => {
    numberHandler(event.target.value);
  };
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          type="text"
          placeholder="Enter a name"
          value={name}
          onChange={handleNameChange}
          required={true}
        />
      </div>
      <div>
        number:
        <input
          type="text"
          placeholder="Enter phonenumber"
          value={number}
          onChange={handleNumberChange}
          required={true}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export const Persons = ({ persons }) => {
  return (
    <div>
      <div>
        {persons.map((person) => (
          <p key={person.name}>
            {person.name}, {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};
