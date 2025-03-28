export function LoginForm(PlayerID, SetPlayerID, handleSubmit) {
    return (
        <form>
            <label>Enter your name:
                <input
                    type="text"
                    value={PlayerID}
                    onChange={(e) => SetPlayerID(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
            </label>
        </form>
    )
}