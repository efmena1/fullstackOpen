import React from "react";

const Button = ({ text, onClick, value }) => {
  return (
    <>
      <button value={value} onClick={onClick}>{text}</button>
    </>
  );
};

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

export const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <div>
        <table>
          <tbody>
          {persons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><Button value={person.id} onClick={deletePerson} text="delete" /></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
