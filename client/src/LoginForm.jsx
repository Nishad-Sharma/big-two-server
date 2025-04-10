import { useState } from "react";

export const LoginForm = ({ handleSubmit }) => {
    const [data, setData] = useState("");

    const handleChange = (event) => {
        setData(event.target.value);
    };

    return (
        <div className="loginForm">
            <input maxlength="15" spellCheck="false" className="submitForm" type="text" value={data} onChange={handleChange} />
            <button className="menuButton" onClick={() => handleSubmit(data)}>submit</button>
        </div>
    );
}