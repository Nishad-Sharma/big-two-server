import { useState } from "react";

export const LoginForm = ({ handleSubmit }) => {
    const [data, setData] = useState("");

    const handleChange = (event) => {
        setData(event.target.value);
    };

    return (
        <div className="App">
            <input type="text" value={data} onChange={handleChange} />
            <button onClick={() => handleSubmit(data)}>Submit</button>
        </div>
    );
}