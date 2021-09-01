import React, { useState } from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.findIndex((person) => person.name === personObject.name) >= 0)
      window.alert(`${personObject.name} is already added to phonebook`);
    else {
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const PersonsData =
    persons.findIndex((person) => person.name === filter) >= 0
      ? persons.filter((person) => person.name === filter)
      : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new person</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} required={true} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
            required={true}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Persons persons={PersonsData} />
    </div>
  );
};

export default App;
