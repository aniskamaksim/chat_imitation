import {v1} from "uuid";
import {MessageType} from "../App";
import {AddMessageAC, DeleteMessageAC, EditMessageAC, MessageReducers} from "./message-reducers";

let startState: MessageType[];
beforeEach(()=>{
    const firstUserId = "1";
    const secondUserId = "2";
    startState = [
        {idUser: firstUserId, idMessage: "100", messageText: "Hello", time: "22:00"},
        {idUser: secondUserId, idMessage: "101", messageText: "Hi there", time: "22:01"},
        {idUser: firstUserId, idMessage: "rrr", messageText: "What is going on?", time: "23:00"}
    ]
})

test("new message should be added", ()=>{
    const endState = MessageReducers(startState, AddMessageAC("1", "qwerty"))

    expect(endState.length).toBe(4)
    expect(endState[4]).toBe(undefined)
    expect(endState[3].messageText).toBe("qwerty")
    expect(endState[3].idUser).toBe("1")
    expect(endState[1].idUser).toBe("2")

})

test ("correct message text should be changed", ()=>{
    const endState = MessageReducers(startState, DeleteMessageAC("101"))

    expect(endState.length).toBe(3)
    expect(endState[1].messageText).toBe("message deleted")
    expect(endState[0].messageText).toBe("Hello")
})

test("correct message text should be edited", ()=>{
    const endState = MessageReducers(startState, EditMessageAC("101", "aaa"))

    expect(endState.length).toBe(3)
    expect(endState[1].messageText).toBe("aaa")
    expect(endState[0].messageText).toBe("Hello")
})