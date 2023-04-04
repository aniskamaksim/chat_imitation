import React, {KeyboardEvent, ChangeEvent, FC, useState} from 'react';
import {UserType} from "../App";
import "./message.css";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {TextField} from "@mui/material";

type MessagesPropsType = {
    idUser: string,
    idMessage: string,
    users: UserType,
    messagesText: string
    deleteMessage: (messageId: string) => void,
    editMessage: (messageId: string, newMessageText: string) => void,
    time: string,
}
export const Messages: FC<MessagesPropsType> = (
    {
        idUser,
        idMessage,
        users,
        messagesText,
        deleteMessage,
        editMessage,
        time
    }
) => {

    const [newTextMessage, setNewTextMessage] = useState<string>(messagesText);
    const [edit, setEdit] = useState<boolean>(false);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.value)
        setNewTextMessage(event.currentTarget.value);
    }
    const switchEditMode = () => {
        !edit ? setEdit(true) : setEdit(false);
        editMessage(idMessage, newTextMessage);
    }
    const onKewDownHandler = (event: KeyboardEvent) => {
        event.key === "Enter" && switchEditMode();
    }
    const deleteMessageHandler = () => {
        deleteMessage(idMessage);
    }
    const isThisMessageMy = idUser === users.id;
    return (
        <div className={isThisMessageMy ? "left" : "right"}>
            {!edit ?
                <div className={isThisMessageMy ? "mine" : "aliens"} onDoubleClick={switchEditMode}>
                    <span className={messagesText === "message deleted" ? "deleted" : ""}>{messagesText}</span>
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
            <div className={"time"}>{time}</div>
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
                            onClick={deleteMessageHandler}
                >
                    <DeleteIcon fontSize="inherit"
                                color={"secondary"}

                    />
                </IconButton>
            </div>
        </div>
    );
};