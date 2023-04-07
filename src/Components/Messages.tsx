import React, {KeyboardEvent, ChangeEvent, FC, useState} from 'react';
import {MessageType, UserType} from "../App";
import "./message.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {DeleteMessageAC, EditMessageAC} from "../Store/message-reducers";

type MessagesPropsType = {
    messages: MessageType,
    users: UserType,
}
export const Messages: FC<MessagesPropsType> = ({messages, users}) => {
    const dispatch = useDispatch();
    const [newTextMessage, setNewTextMessage] = useState<string>(messages.messageText);
    const [edit, setEdit] = useState<boolean>(false);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTextMessage(event.currentTarget.value);
    }
    const switchEditMode = () => {
        !edit ? setEdit(true) : setEdit(false);
        dispatch(EditMessageAC(messages.idMessage, newTextMessage));
    }
    const onKewDownHandler = (event: KeyboardEvent) => {
        event.key === "Enter" && switchEditMode();
    }

    const isThisMessageMy = messages.idUser === users.id;
    return (
        <div className={isThisMessageMy ? "left" : "right"}>
            {!edit ?
                <div className={isThisMessageMy ? "mine" : "aliens"} onDoubleClick={switchEditMode}>
                    <span
                        className={messages.messageText === "message deleted" ? "deleted" : ""}>{messages.messageText}</span>
                </div> :
                <TextField type={"text"}
                           value={newTextMessage}
                           onChange={onChangeHandler}
                           onBlur={switchEditMode}
                           autoFocus={true}
                           onKeyDown={onKewDownHandler}
                           size={"small"}
                           color={"secondary"}
                />
            }
            <div className={"time"}>{messages.time}</div>
            <div className={isThisMessageMy ? "Edit_Delete" : "no-display"}>
                <IconButton disabled={!isThisMessageMy}
                            color={"primary"}
                            size={"small"}
                            onClick={switchEditMode}
                >
                    <EditIcon fontSize={"inherit"}
                              color={"secondary"}
                              display={isThisMessageMy ? "flex" : "none"}
                    /></IconButton>
                <IconButton disabled={!isThisMessageMy}
                            color={"primary"}
                            size={"small"}
                            onClick={() => dispatch(DeleteMessageAC(messages.idMessage))}
                >
                    <DeleteIcon fontSize="inherit"
                                color={"secondary"}
                    />
                </IconButton>
            </div>
        </div>
    );
};