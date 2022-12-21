import React from 'react';
import { useNavigate } from "react-router-dom"
import { Manager } from "socket.io-client";
import Message from '../components/Message';
import System from '../components/System';

const manager = new Manager("ws://localhost:9999", {
    transports: ["websocket"]
})

const Chat = () => {
    //test
    const [enabled, toggle] = React.useReducer((x) => !x, false);

    // Parameters
    const nav = useNavigate();
    const [socket, setSocket] = React.useState(manager.socket("/"));
    const [user, setUser] = React.useState<string>("");

    // Message list
    const [messageListe, setMessageListe] = React.useState<{ user: string, message?: string, join?: boolean }[] | []>([]);

    // User input
    const [message, setMessage] = React.useState<string>("");

    React.useEffect(() => {
        if (!localStorage.getItem("name")) {
            nav("/");
        } else {
            setUser(localStorage.getItem("name") as string);
        };
        return () => {
            socket.on("connect", () => {
                console.debug("[WS] Connection success !");
                console.log(user, localStorage.getItem("name"))
            });
            socket.emit("join", { user: localStorage.getItem("name") });
            socket.on("joinChat", (args) => {
                setMessageListe(old => [...old, args]);
            });
    
            socket.on("messageCreate", (args) => {
                setMessageListe(old => [...old, args]);
            });

            socket.on("leaveChat", (args) => {
                setMessageListe(old => [...old, args]);
            });
        };
    }, [enabled]);


    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message) return;

        socket.emit("messageSend", {user:user, message:message,});
        setMessage("");
    }

    const disconnect = () => {
        localStorage.clear();
        nav("/");
    };

    return (
        <div>
            {/* Chat bulle */}
            <div>
                {
                    messageListe.map(elements => {
                        if (!elements.message) {
                            return (
                                <System user={elements.user} join={elements.join!} />
                            )
                        } else {
                            return (
                                <Message user={elements.user} message={elements.message} />
                            );
                        }
                    })
                }
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder='Aa'
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <input type="submit" value="Send" />
                <input type="button" value="disconnect" onClick={disconnect} />
            </form>
        </div>
    );
};

export default Chat;