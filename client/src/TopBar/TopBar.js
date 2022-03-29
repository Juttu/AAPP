import {Menubar} from 'primereact/menubar';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './topbar.scss';
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {isAuthenticated} from "../components/auth/auth.utils";

function TopBar() {


    const [loggedIn, setLoggedIn] = React.useState(false);

    const template = (item, options) => {
        return (
            <Link to={`${item.url}`} role="menuitem" className={options.className} target={item.target}
                  onClick={options.onClick}>
                {item.icon ? <span className={options.iconClassName}/> : <FontAwesomeIcon className={options.iconClassName} icon={item.faIcon} />}
                <span className="p-menuitem-text">{item.label}</span>
            </Link>
        );
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '/',
            template: template
        }
    ];

    useEffect(() => {
        setLoggedIn(isAuthenticated());
    }, []);

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <Menubar model={items} end={
                    <React.Fragment>
                        {loggedIn && <Button icon="pi pi-sign-out" className="p-button-text" onClick={() => {
                            localStorage.removeItem('token');
                        }}/>}
                    </React.Fragment>
                }/>
            </div>
        </div>
    );
}

export default TopBar;