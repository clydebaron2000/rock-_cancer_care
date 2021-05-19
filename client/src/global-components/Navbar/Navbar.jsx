import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { MenuItems } from "./MenuItems-list";
import '../../css/navbar.css';

// import './styles.css';
// import {faBars,faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCoffee, faTimes } from '@fortawesome/free-solid-svg-icons'
import logo from '../../dist/images/logo_full.png'
export default class Navbar extends Component {
    state = { active: false }
    handleClick = _ =>{
         this.setState({ active: !this.state.active })
         console.log(!this.state.active)
        }
    render() {
        return (
        <nav className="nav">
            <div className='content'>
                <a href="/" className="logo-link"> 
                    <img src={logo} className='logo'></img>
                    <i className="fas fa-link"></i>
                </a>

                <div className="collapse-icon" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={this.state.active ? faTimes : faBars}/>
                </div>
                {/* If icon above is clicked, set ul tag as active or native */}
                <ul className={this.state.active ? 'menu active' : 'menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={"options "+item.style} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav> 
        )
    }
}

