import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import { PersonForm, Persons } from "./components/persons";
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const personId = persons.find(
      (person) => person.name === personObject.name
    );
    if (personId !== undefined) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(personId.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personId.id ? person : updatedPerson
              )
            );
          });
      }
    } else {
      personService.create(personObject).then((person) => {
        setPersons(persons.concat(person));
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (event) => {
    const personToDelete = persons.find(
      (person) => person.id === parseInt(event.target.value)
    );
    if (window.confirm(`¿Delete ${personToDelete.name}?`)) {
      personService.deletePerson(personToDelete.id).then((person) => {
        personService.getAll().then((persons) => {
          setPersons(persons);
        });
      });
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
      <Persons persons={PersonsData} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
