const Notif = ({ message }) => {
    if (message === null) {
        return null
    }
    if (!message[1]) {
        return(
            <div className='notif'>
                {message[0]}
            </div>
        )
    } else {
        return(
            <div className='error'>
                {message[0]}
            </div>
        )
    }
}

export default Notif