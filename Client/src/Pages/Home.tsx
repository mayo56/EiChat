import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const nav = useNavigate();
    const [name, setName] = React.useState<string>("");
    const [error, setError] = React.useState<string>("");

    React.useEffect(() => {
        return () => {
            if (localStorage.getItem("name")) {
                nav("/app");
            };
        };
    });

    const startChat = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("submit")
        e.preventDefault();
        if (!name) return setError("Give me your name or your username TwT");

        localStorage.setItem("name", name);
        nav("/app");
    };

    return (
        <div>
            <h1>
                Welcome to EiChat !
            </h1>
            <p>
                This is a chat made by Mayo where you can speack with other persons
                in anonyma !! Try it !
            </p>
            <form onSubmit={startChat}>
                <label>
                    Give me your name:
                </label>
                <input
                    type="text"
                    placeholder='Your name here'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input type="submit" value="Start Chatting !" />
            </form>
            <p>{error}</p>
        </div>
    );
};

export default Home;