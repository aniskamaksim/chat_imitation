import {MessageType} from "../App";
import {v1} from "uuid";

export type AddMessageAT = ReturnType<typeof AddMessageAC>
export type DeleteMessageAT = ReturnType<typeof DeleteMessageAC>
export type EditMessageAT = ReturnType<typeof EditMessageAC>

const firstUserId = "1";
const secondUserId = "2";
const initialState: MessageType[] = [
    {idUser: firstUserId, idMessage: v1(), messageText: "Hello", time: "22:00"},
    {idUser: secondUserId, idMessage: v1(), messageText: "Hi there", time: "22:01"},
    {idUser: firstUserId, idMessage: v1(), messageText: "What is going on?", time: "23:00"}
]
export type MessageReducersType = AddMessageAT | DeleteMessageAT | EditMessageAT
export const MessageReducers = (messages = initialState, action: MessageReducersType): MessageType[] => {
    switch (action.type) {
        case "ADD-MESSAGE":
            return [...messages, action.newMessage];
        case "DELETE-MESSAGE":
            return messages.map(e => e.idMessage === action.payload.messageId ? {...e, messageText: "message deleted"} : e)
        case "EDIT-MESSAGE":
            return messages.map(e => e.idMessage === action.payload.messageId ?
                {...e, messageText: action.payload.newMessageText === "" ? "message deleted" : action.payload.newMessageText} : e);
        default:
            return messages;
    }
}

export const AddMessageAC = (userId: string, newMessageText: string) => {
    return {
        type: "ADD-MESSAGE",
        newMessage: {
            idUser: userId,
            idMessage: v1(),
            messageText: newMessageText,
            time: new Date().toTimeString().slice(0, 5)
        }
    }as const
}
export const DeleteMessageAC = (messageId: string) => {
    return {
        type: "DELETE-MESSAGE",
        payload: {
            messageId
        }
    }as const
}
export const EditMessageAC = (messageId: string, newMessageText: string) =>{
    return {
        type: "EDIT-MESSAGE",
        payload: {
            messageId,
            newMessageText
        }
    }as const
}
