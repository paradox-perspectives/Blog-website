import {AuthProvider} from "react-auth-kit";
import React from "react";
import Login from "../Login";

function HomeSecure() {

    const list = ["add", "edit", "publish", "view","emails"];

    return (
        <div>
            <ol>
                {list.map((item) => (
                    <li key={item}>
                        <a href={`/#${item}`} >
                            <p>{item}</p>
                        </a>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default HomeSecure;

