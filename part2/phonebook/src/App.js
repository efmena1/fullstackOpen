import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import {PersonForm,Persons} from "./components/persons"
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === ''){
      window.alert('Nombre Vacio')
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.findIndex((person) => person.name === personObject.name) >= 0)
      window.alert(`${personObject.name} is already added to phonebook`);
    else {
      personService.create(personObject).then(person =>{
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
    }

  };
  
  const PersonsData =
    persons.findIndex(
      (person) => person.name.toLocaleLowerCase() === filter.toLocaleLowerCase()
    ) >= 0
      ? persons.filter(
          (person) =>
            person.name.toLocaleLowerCase() === filter.toLocaleLowerCase()
        )
      : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter state={filter} handler={setFilter} />
      <h2>Add a new person</h2>
      <PersonForm
        name={newName}
        nameHandler={setNewName}
        number={newNumber}
        numberHandler={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={PersonsData} />
    </div>
  );
};

export default App;
