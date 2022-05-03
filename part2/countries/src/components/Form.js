const Form = ( {setNewSearch}) => (
    <div>
        <form>
            find countries <input onChange={setNewSearch}></input>
        </form>
    </div>
)

export default Form