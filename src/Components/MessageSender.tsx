import React, {ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState} from 'react';
import "./messageSender.css"
import {TextField, Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

type MessageSenderType = {
    userId: string,
    addMessage: (userId: string, newMessageText: string) => void,
    // lastMessageScroll: () => void
}
export const MessageSender: FC<MessageSenderType> = (
    {
        userId,
        addMessage,
        // lastMessageScroll
    }
) => {
    const [text, setText] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const isMessageCorrect = text.trim().length;
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
        setError(false);
    }
    const addMessageHandler = () => {
        isMessageCorrect ? addMessage(userId, text) : setError(true);
        setText("");
        // lastMessageScroll();
    }
    const onKeyDownHandler = (event: KeyboardEvent) => {
        event.key === "Enter" && addMessageHandler();
    }

    return (
        <div className={"MessageSender"}>
            <TextField id="outlined-basic"
                       label={error ? "Not only spaces pls" : "Start typing here"}
                       variant="outlined"
                       sx={{width: "250px"}}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       value={text}
                       color={error ? "warning" : "primary"}
                       size={"small"}
            />
            <Button variant="outlined"
                    endIcon={<SendIcon/>}
                    onClick={addMessageHandler}
                    disabled={error || !isMessageCorrect}
                    size={"large"}>
            </Button>
        </div>
    );
};