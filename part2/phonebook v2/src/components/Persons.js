const Persons = ( { persons, newSearch, remove } ) => (
    <div> 
        {persons
            .filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()))
            .map(person =>
                <div key ={person.id}>
                    <span>{person.name} {person.num} </span>  
                    <button onClick={() => remove(person.id)}> delete </button>
                    <br/><br/>
                </div>)}
    </div>)

export default Persons