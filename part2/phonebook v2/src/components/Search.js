const Search = ( {newSearch, setSearch} ) => (
    <div>
        search: <input value={newSearch} onChange={setSearch}/>
    </div>)

export default Search