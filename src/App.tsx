import './App.css';
import {MainScreen} from "./Components/MainScreen";
import "./App.css"
import {useSelector} from "react-redux";
import {rootReducerType} from "./Store/store";

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
    const users = useSelector<rootReducerType, UserType[]>((state) => state.users)
    const usersMap = users.map((e) => {
        return (
            <MainScreen key={e.id}
                        users={e}
            />
        )
    })
    return (
        <div className="mainDiv">
            <div className={"instructions"}>
                <ol><h3>Implemented in this app:</h3>
                    <li>React-Redux / TypeScript;</li>
                    <li>Date/Time API;</li>
                    <li>useState, useEffect, useRef, useDispatch, useSelector hooks;</li>
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
