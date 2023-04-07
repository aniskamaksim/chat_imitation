import {ChangeUserNameAC, ChangeUserStatusAC, HideUserNumberAC, UserReducer} from "./user-reducers"
import users, {UserType} from "../App"
import logorounded from "../Assets/Img/logorounded.png";
import Sasha_Gray from "../Assets/Img/Sasha_Gray.jpg";

let startState: UserType[]
beforeEach(()=> {
    const firstUserId = "1";
    const secondUserId = "2";
    startState = [
        {id: firstUserId, userName: "Maks", telNumber: "375296667666", avatar: logorounded, show: true},
        {id: secondUserId, userName: "Sasha", telNumber: "14297776777", avatar: Sasha_Gray, show: true},
    ]
})

test("correct userName should be changed", ()=>{
    const endState: UserType[] = UserReducer(startState, ChangeUserNameAC("1", "Makusemo"))

    expect(endState[0].userName).toBe("Makusemo")
    expect(endState[1].userName).toBe("Sasha")

});

test ("status of correct user should be changed", ()=> {
    const endState: UserType[] = UserReducer(startState, ChangeUserStatusAC("2"))

    expect(endState[0].show).toBe(true)
    expect(endState[1].show).toBe(false)
})

test("tel number of correct user should be hide", ()=>{
    const endState: UserType[] = UserReducer(startState, HideUserNumberAC("2"))

    expect(endState[0].telNumber).toBe("375296667666")
    expect(endState[1].telNumber).toBe("##########")
})