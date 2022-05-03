const Input = ( { submission, newName, setName, newNum, setNum }) => (
    <div>
        <form onSubmit={submission}>
            <div>
            name: <input value={newName} onChange={setName}/>
            <br/>
            number: <input value={newNum} onChange={setNum}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </div>)

export default Input