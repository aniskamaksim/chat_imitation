import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {MainScreen} from "./Components/MainScreen";
import logorounded from "./Assets/Img/logorounded.png";
import Sasha_Gray from "./Assets/Img/Sasha_Gray.jpg";
import "./App.css"

export type MessageType = {
    idUser: string,
    idMessage: string,
    messageText: string,
    time: string
}
export type UserType = {
    id: string,
    userName: string,
    telNumber: string,
    avatar: string,
    show: boolean
}

function App() {

    const firstUserId = "1";
    const secondUserId = "2";
    const [users, setUsers] = useState<UserType[]>([
        {id: firstUserId, userName: "Maks", telNumber: "375296667666", avatar: logorounded, show: true},
        {id: secondUserId, userName: "Sasha", telNumber: "14297776777", avatar: Sasha_Gray, show: true},
    ])
    const [messages, setMessages] = useState<MessageType[]>([
        {idUser: firstUserId, idMessage: v1(), messageText: "Hello", time: "22:00"},
        {idUser: secondUserId, idMessage: v1(), messageText: "Hi there", time: "22:01"},
        {idUser: firstUserId, idMessage: v1(), messageText: "What is going on?", time: "23:00"}
    ])
    const changeUserName = (userId: string, newName: string) => {
        setUsers(users.map((e) => e.id === userId ? {...e, userName: newName} : e))
    }
    const changeUserStatus = (userId: string) => {
        const newStatus = users.map(e => e.id === userId ? {...e, show: !e.show} : e)
        setUsers(newStatus)
    }
    const userStatus = users.map(e => e.show)
    const addMessage = (userId: string, newMessageText: string) => {
        const newMessage = {
            idUser: userId,
            idMessage: v1(),
            messageText: newMessageText,
            time: new Date().toTimeString().slice(0, 5)
        }
        setMessages([...messages, newMessage])
    }
    const deleteMessage = (messageId: string) => {
        setMessages(messages.map(e => e.idMessage === messageId ? {...e, messageText: "message deleted"} : e))
    }
    const editMessage = (messageId: string, newMessageText: string) => {
        setMessages(messages.map(e => e.idMessage === messageId ?
            {...e, messageText: newMessageText === "" ? newMessageText = "message deleted" : newMessageText} : e))
    }
    //TODO: hideNumber must not only hide number but show it too

    const hideNumber = (userId: string) => {
        userStatus ?
            setUsers(users.map(e => e.id === userId ? {...e, telNumber: "##########"} : e)) :
            setUsers(users)
    }
    const checkUserPhone = users.map(e => e.telNumber)

    const usersMap = users.map((e) => {
        return (
            <MainScreen key={e.id}
                        userId={e.id}
                        messages={messages}
                        users={e}
                        addMessage={addMessage}
                        deleteMessage={deleteMessage}
                        editMessage={editMessage}
                        hideNumber={hideNumber}
                        changeStatus={changeUserStatus}
                        userStatus={userStatus}
                        changeUserName={changeUserName}
            />
        )
    })
    return (
        <div className="mainDiv">
            <div className={"instructions"}>
                <ol><h3>Implemented in this app:</h3>
                    <li>React - TS;</li>
                    <li>Date/Time API;</li>
                    <li>useState, useEffect, useRef hooks;</li>
                    <li>Material UI components;</li>
                    <li>3 way CSS using;</li>
                    <li>You can text, edit/delete names, messages;</li>
                    <li style={{listStyleType: "none", fontStyle: "oblique"}}>Enjoy the CRUD :)</li>
                </ol>
                <ol><h3>Not yet:</h3>
                    <li>Scroll to last message in both screens;</li>
                    <li>hide number details (eye picture, some logic);</li>
                </ol>
            </div>
            <div className="AppDiv">
                {usersMap}
            </div>
        </div>
    );
}

export default App;
