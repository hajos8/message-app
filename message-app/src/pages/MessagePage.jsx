import { Fragment } from "react";
import NavBarComponent from "../components/NavBarComponent";

export default function MessagePage() {
    return (
        <Fragment style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <NavBarComponent />
            <h1>Ez itt az Üzenetek oldal</h1>
        </Fragment>
    )
}