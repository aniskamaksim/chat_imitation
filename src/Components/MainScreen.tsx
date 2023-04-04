import React, {ChangeEvent, FC, useEffect, useRef, useState, KeyboardEvent} from 'react';
import {MessageType, UserType} from "../App";
import {Messages} from "./Messages";
import "./mainScreen.css"
import {MessageSender} from "./MessageSender";
import EditIcon from "@mui/icons-material/Edit";

type MainScreenType = {
    userId: string
    messages: MessageType[],
    users: UserType,
    addMessage: (UserId: string, newMessageText: string) => void,
    deleteMessage: (messageId: string) => void,
    editMessage: (messageId: string, newMessageText: string) => void,
    hideNumber: (userId: string) => void,
    changeStatus: (userId: string) => void,
    userStatus: boolean[],
    changeUserName: (userId: string, newName: string) => void
}
export const MainScreen: FC<MainScreenType> = (
    {
        userId,
        messages,
        users,
        addMessage,
        deleteMessage,
        editMessage,
        hideNumber,
        changeStatus,
        userStatus,
        changeUserName
    }
) => {
    const [userName, setUserName] = useState<string>(users.userName);
    const [edit, setEdit] = useState<boolean>(false)
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);
    const lastSeenTime = new Date().toTimeString().slice(0, 5);

    const onChangeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent) => {
        event.key === "Enter" && switchEdit();
    }
    const switchEdit = () => {
        edit ? setEdit(false) : setEdit(true);
        changeUserName(userId, userName);
    }

    const messagesMap = messages.map((e) => {
        return (
            <Messages key={e.idMessage}
                      idUser={e.idUser}
                      idMessage={e.idMessage}
                      users={users}
                      messagesText={e.messageText}
                      deleteMessage={deleteMessage}
                      editMessage={editMessage}
                      time={e.time}
            />
        )
    });
    return (
        <div className={"MainScreen"}>
            <div className={"UserBlock"}>
                <div className={"UserDetailDiv"}>
                    <img src={users.avatar} alt="avatar" className={"roundImg"}/>
                    <div className={"UserDetailDiv_name"}>
                        {!edit ?
                            <span onDoubleClick={switchEdit}>{users.userName}</span> :
                            <input type={"text"}
                                   value={userName}
                                   onBlur={switchEdit}
                                   autoFocus={true}
                                   onChange={onChangeNameHandler}
                                   onKeyDown={onKeyDownHandler}
                            />}
                        <EditIcon fontSize={"inherit"}
                                  color={"primary"}
                                  onClick={switchEdit}
                                  onBlur={switchEdit}
                        />
                    </div>
                    <div className={"lastSeen"}>last seen at {lastSeenTime}</div>
                </div>
            </div>
            <div className={"InputAndNumber"}><input type={"checkbox"} defaultChecked={true}
                                                     onChange={() => changeStatus(userId)}/>
                <span>tel: +</span><span
                    className={users.show ? "telNumber" : "notelNumber"}>{users.telNumber}</span>
                <button onClick={() => hideNumber(userId)}>p</button>
            </div>

            <div className={"textArea"}>
                {messagesMap}
                <div ref={divRef} id={"wrapper_Scroll_to_bottom" + users.id}></div>
            </div>
            <MessageSender key={userId}
                           userId={userId}
                           addMessage={addMessage}
                //lastMessageScroll={lastMessageScroll}
            />
        </div>
    );
};
