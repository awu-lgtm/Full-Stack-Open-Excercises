const Persons = ( { persons, newSearch } ) => (
    <div> 
        {persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase())).map(person => <p key={person.id}>{person.name} {person.num}</p>)}
    </div>)

export default Persons