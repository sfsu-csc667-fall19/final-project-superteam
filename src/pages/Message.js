import React from 'react';

const Message = ({ senderName, message }) => {

    return(
        <div>
            <p>{message}   {senderName}</p>
        </div>
    )
}

export default Message;


