import React from 'react';

const Message = (props: {user:string, message:string}) => {
    return (
        <div>
            <br/>
            <p>{props.user}</p>
            <p>{props.message}</p>
            <br/>
        </div>
    );
};

export default Message;