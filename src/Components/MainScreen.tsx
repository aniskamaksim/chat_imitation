import React, {ChangeEvent, FC, useEffect, useRef, useState, KeyboardEvent} from 'react';
import {MessageType, UserType} from "../App";
import {Messages} from "./Messages";
import "./mainScreen.css"
import {MessageSender} from "./MessageSender";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch, useSelector} from "react-redux";
import {ChangeUserNameAC, ChangeUserStatusAC} from "../Store/user-reducers";
import {rootReducerType} from "../Store/store";

type MainScreenType = {
    users: UserType
}
export const MainScreen: FC<MainScreenType> = ({users}) => {
    const dispatch = useDispatch();
    const messages = useSelector<rootReducerType, MessageType[]>((state) => state.messages)
    const [newUserName, setNewUserName] = useState<string>(users.userName);
    const [edit, setEdit] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages]);

    const onChangeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewUserName(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent) => {
        event.key === "Enter" && switchEdit();
    }
    const switchEdit = () => {
        edit ? setEdit(false) : setEdit(true);
        dispatch(ChangeUserNameAC(users.id, newUserName));
    }

    const messagesMap = messages.map((e) => {
        return (
            <Messages
                key={e.idMessage}
                users={users}
                messages={e}
            />
        )
    });
    const lastSeenTime = new Date().toTimeString().slice(0, 5);
    return (
        <div className={"MainScreen"}>
            <div className={"UserBlock"}>
                <div className={"UserDetailDiv"}>
                    <img src={users.avatar} alt="avatar" className={"roundImg"}/>
                    <div className={"UserDetailDiv_name"}>
                        {!edit ?
                            <span onDoubleClick={switchEdit}>{users.userName}</span> :
                            <input type={"text"}
                                   value={newUserName}
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
            <div className={"InputAndNumber"}>
                <input type={"checkbox"}
                       defaultChecked={true}
                       onChange={() => dispatch(ChangeUserStatusAC(users.id))}/>
                <span>tel: +</span><span
                className={users.show ? "telNumber" : "notelNumber"}>{users.telNumber}</span>
                <button onClick={() => dispatch(ChangeUserStatusAC(users.id))}>p</button>
            </div>

            <div className={"textArea"}>
                {messagesMap}
                <div ref={divRef} id={"wrapper_Scroll_to_bottom" + users.id}></div>
            </div>
            <MessageSender
                // key={users.id}
                userId={users.id}
                //lastMessageScroll={lastMessageScroll}
            />
        </div>
    );
};
