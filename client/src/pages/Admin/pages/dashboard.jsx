import { useState,useEffect } from "react"
import {useUserState} from '../contexts/user' 
import API from "../../../utils/API"
import devConsole from "../../../utils/devConsole"
import Navbar from 'react-bootstrap/Navbar'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import "../../../css/dashboard.css"
function Dashboard(props){
    const [userId,setUserID]=useUserState()
    const [userInfo,setUserInfo]=useState({})
    const [selected,setSelected]=useState({})
    const [searchType,setSearchtype]=useState("patient")
    const [searchResults,setSearchResults]=useState([])
    const [nameSearch,setNameSearch]=useState("")

    useEffect(_=>{
        devConsole.log(userId)
            API.findUserById(userId).then(res=>{
                setUserInfo(res.data)
                if (res.data.$regex.username===undefined)setUserID("")
                // console.log(res.data)
            })
            .catch(err=>setUserID(""))
    },[userId])
    useEffect(_=>{
        if(searchType==="patient"){
            API.getAllPatients((nameSearch==="")?null:{"first name":{$regex:nameSearch}}).then(res=>{
                // console.log(res.data)
                setSearchResults(res.data)
            })
        }else if(searchType==="volunteer"){
            API.getAllVolunteers((nameSearch==="")?null:{"first name":{$regex:nameSearch}}).then(res=>{
                // console.log(res.data)
                setSearchResults(res.data)
            })
        }
    },[nameSearch,searchType])
    return (
        <div className="background">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossorigin="anonymous"
                />
            <Navbar collapseOnSelect expand="lg">
            <Container>
            <Navbar.Brand href="#">RCC admin portal</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav variant="tabs" defaultActiveKey="#patients" className="me-auto">
                {/* <Nav.Link isSelected={true}>Patient Directory</Nav.Link>
                <Nav.Link >Volunteer Directory</Nav.Link> */}
                    <Nav.Item>
                        <Nav.Link eventKey="#patients"
                        onClick={_=>setSearchtype("patient")}
                        >Patients</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="#volunteers"
                        onClick={_=>setSearchtype("volunteer")}
                        >Volunteers</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className="nav-right">
                <div className="userName">Welcome {userInfo.username}!</div>
                <Nav.Link onClick={_=>setUserID("")}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            <div className="content">
                <div className="search">
                    <div>{searchType}</div>
                    <div className="searchBar">
                        <input onChange={e=>setNameSearch(e.target.value)}/>
                    </div>
                    <div className="list-container">
                        <ul>{
                            searchResults.map((item)=><li >
                                <button onClick={_=>setSelected(item)}>{item["first name"]}</button>
                            </li>)
                        }</ul>
                    </div>
                </div>
                <div className="doc">
                    <div>
                        {JSON.stringify(selected)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard