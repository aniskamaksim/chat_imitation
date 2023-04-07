import React, {ChangeEvent, FC, KeyboardEvent, useEffect, useRef, useState} from 'react';
import "./messageSender.css"
import {TextField, Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useDispatch} from "react-redux";
import {AddMessageAC} from "../Store/message-reducers";

type MessageSenderType = {
    userId: string
    // lastMessageScroll: () => void
}
export const MessageSender: FC<MessageSenderType> = (
    {
        userId,
        // lastMessageScroll
    }
) => {
    const dispatch = useDispatch();
    const [text, setText] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const isMessageCorrect = text.trim().length;
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
        setError(false);
    }
    const addMessageHandler = () => {
        isMessageCorrect ? dispatch(AddMessageAC(userId, text)) : setError(true);
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