import { useState,useEffect } from "react"
import {useUserState} from '../contexts/user' 
import API from "../../../utils/API"
import devConsole from "../../../utils/devConsole"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import "../../../css/dashboard.css"
import { Document, Page, Text, PDFDownloadLink} from '@react-pdf/renderer'
function Dashboard(props){
    const [userId,setUserID]=useUserState()
    const [userInfo,setUserInfo]=useState({})
    const [selected,setSelected]=useState({})
    const [searchType,setSearchType]=useState("patient")
    const [searchResults,setSearchResults]=useState([])
    const [nameSearch,setNameSearch]=useState("")
    useEffect(_=>{ 
        devConsole.log("userID:",userId)
            API.findUserById(userId).then(res=>{
                setUserInfo(res.data)
                if (res.data.username===undefined)setUserID("")
                devConsole.log("res.data",res.data)
            })
            .catch(err=>{
                devConsole.error(err)
                setUserID("")
            })
    },[userId,setUserID])
    useEffect(_=>{
        if(searchType==="patient"){
            API.getAllPatients((nameSearch==="")?null: { "$expr": {
                "$regexMatch": {
                  "input": { "$concat": ["$first name", " ", "$last name"] },
                  "regex": nameSearch,  //Your text search here
                  "options": "i"
                }
              }
            }).then(res=>{
                setSearchResults(res.data)
            }).catch(console.err)
        }else if(searchType==="volunteer"){
            API.getAllVolunteers((nameSearch==="")?null:(nameSearch==="")?null: { "$expr": {
                "$regexMatch": {
                  "input": { "$concat": ["$first name", " ", "$last name"] },
                  "regex": nameSearch,  //Your text search here
                  "options": "i"
                }
              }
            }).then(res=>{
                setSearchResults(res.data)
            }).catch(console.err)
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
                        onClick={_=>setSearchType("patient")}
                        >Patients</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="#volunteers"
                        onClick={_=>setSearchType("volunteer")}
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
                                <button onClick={_=>setSelected(item)}>{item["last name"]+", "+item["first name"]}</button>
                            </li>)
                        }</ul>
                    </div>
                </div>
                <div className="doc">
                    <div>
                        {
                            (Object.keys(selected).length<1)?null:<PDFDownloadLink
                        document={<Document>
                            <Page >
                            {Object.keys(selected).map(key=>{
                            if (key!=="_id" && key!=="__v")
                            if (selected[key]!=="" && 
                                selected[key]!==null && 
                                selected[key]!==undefined && 
                                selected[key]?.length!==0){
                                console.log(key,selected[key],typeof(selected[key]))
                                return <Text>{key}:{`${selected[key]}`}</Text>
                            }
                            return null
                        })}
                            </Page>
                        </Document>}
                        fileName={`${selected?.["first name"]}_${selected?.["last name"]}_${selected?.["_id"]}.pdf`}
                        >
                        {({ blob, url, loading, error }) =>
                                loading ? "Loading document..." : "Download Pdf"
                            }
                        </PDFDownloadLink>}
                        {Object.keys(selected).map(key=>{
                            if (key!=="_id" && key!=="__v")
                            if (selected[key]!=="" && 
                                selected[key]!==null && 
                                selected[key]!==undefined && 
                                selected[key]?.length!==0){
                                console.log(key,selected[key],typeof(selected[key]))
                                return <div>{key}:{`${selected[key]}`}</div>
                            }
                            return null
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard