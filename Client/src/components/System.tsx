import React from 'react';

const System = (props: {user:string, join:boolean}) => {
    return (
        <div>
            <br />
            <p>{props.user}{props.join ? " join the chat !" : " leave the chat..."}</p>
            <br />
        </div>
    );
};

export default System;