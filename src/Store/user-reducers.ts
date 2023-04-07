import {UserType} from "../App";
import logorounded from "../Assets/Img/logorounded.png";
import Sasha_Gray from "../Assets/Img/Sasha_Gray.jpg";

const firstUserId = "1";
const secondUserId = "2";
const initialState :UserType[] = [
    {id: firstUserId, userName: "Maks", telNumber: "375296667666", avatar: logorounded, show: true},
    {id: secondUserId, userName: "Sasha", telNumber: "14297776777", avatar: Sasha_Gray, show: true},
]
export type UserReducersType = ChangeUserNameAT | ChangeUserStatusAT | HideUserNumberAT
export const UserReducer = (users = initialState, action: UserReducersType): UserType[] => {
    switch(action.type) {
        case "CHANGE-USER-NAME":
            return users.map(e=>e.id === action.payload.userId ? {...e, userName: action.payload.newName} : e);
        case "CHANGE-USER-STATUS":
            return users.map(e => e.id === action.payload.userId ? {...e, show: !e.show} : e);
        case "HIDE-USER-NUMBER":
            return users.map(e=>e.id !== action.payload.userId ? e : e.show ? {...e, telNumber: "##########"} : e);
        default: return users;
    }
}
export type ChangeUserNameAT = ReturnType<typeof ChangeUserNameAC>
export type ChangeUserStatusAT = ReturnType<typeof ChangeUserStatusAC>
export type HideUserNumberAT = ReturnType<typeof HideUserNumberAC>

export const ChangeUserNameAC = (userId: string, newName: string) => {
    return {
        type: "CHANGE-USER-NAME",
        payload: {
            userId,
            newName
        }
    }as const
}
export const ChangeUserStatusAC = (userId: string) => {
    return {
        type: "CHANGE-USER-STATUS",
        payload: {
            userId
        }
    }as const
}
export const HideUserNumberAC = (userId: string) => {
    return {
        type: "HIDE-USER-NUMBER",
        payload: {
            userId
        }
    }as const
}