import { Document,Page,Text,View,StyleSheet,PDFDownloadLink,PDFViewer, Image } from "@react-pdf/renderer";
import logo from "../../../media/logo.png"
import {Table, TableBody, TableHeader, TableCell} from "@david.kucsai/react-pdf-table"
import ReactToPrint from "react-to-print";
import {useReactToPrint} from "react-to-print";
import {forwardRef, useRef} from "react";
import "../../../css/pdf.css"
const docStyles= StyleSheet.create({
    page:{
        padding: "1in", 
    },
    header:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        logo:{
            height:""+139/2+"",
            width:""+300/2+"",
        },
        subtitle:{
            fontSize:15
        },
        title:{
            fontSize:30
        },
        borderBottomWidth:".05in",
        borderBottomColor:"#8865ac",
        borderBottomStyle:"solid",
        marginBottom:".1in"
    },
    section:{
        title:{
            fontSize:20
        },
        fontSize:14,
        padding:".05 in",
        display:"grid",
        gridTemplateColumns: "1fr 1fr",
        // width:"200px"
        // borderBottomWidth:".05in",
        // borderBottomColor:"#8865ac",
        // borderBottomStyle:"solid",
        // marginBottom:".1in"
    }
})
function generatePDF(data){
    return (<Document>
        <Page size="A4" style={docStyles.page} >
            <View style={docStyles.header}>
                <View>
                    <Text style={docStyles.header.subtitle}>{(data?.["cancer type"]!==undefined)?"Patient Details":"Volunteer Details"}</Text>
                    <Text style={docStyles.header.title}>{data?.["last name"]}, {data?.["first name"]}</Text>
                </View>
                <Image style={docStyles.header.logo} src={logo}/>
            </View>
            
            <View style={docStyles.section}>
                <Text style={docStyles.section.title}>Personal information</Text>
                {/* <div>haikjhlkjhlhlhj</div> */}
                <Table data={[{addess:"1",adess:"1",addes:"1",a:"1"}]}>
                    <TableHeader textAlign={"center"}>
                        <TableCell>
                            Address
                        </TableCell>
                        <TableCell>
                            DOB
                        </TableCell>
                        <TableCell>
                            Phone
                        </TableCell>
                        <TableCell>
                            Email
                        </TableCell>
                    </TableHeader>
                </Table>
                
            </View>
            <View style={docStyles.section}>
            {Object.keys(data).map(key=>{
                if (key!=="_id" && key!=="__v")
                if (data[key]!=="" && 
                    data[key]!==null && 
                    data[key]!==undefined && 
                    data[key]?.length!==0){
                        // console.log(key,data[key],typeof(data[key]))
                        return <Text>{key}:{`${data[key]}`}</Text>
                }
                return null
            })}
            {Object.keys(data).map(key=>{
                if (key!=="_id" && key!=="__v")
                if (data[key]!=="" && 
                data[key]!==null && 
                data[key]!==undefined && 
                data[key]?.length!==0){
                    console.log(key,data[key],typeof(data[key]))
                    return <Text>{key}:{`${data[key]}`}</Text>
                }
                return null
            })}
            </View>
        </Page>
    </Document>)
}
export function PDFView({data}){
    const PDF=generatePDF(data)
    return (<PDFViewer width={500} height={1000}>
        {PDF}
    </PDFViewer>)
}
export function PDFDownload({data}){
    const PDF=generatePDF(data)
    return (
        <PDFDownloadLink
        document={PDF}
        fileName={`${data?.["first name"]}_${data?.["last name"]}_${data?.["_id"]}_${data?.["lastModified"]}.pdf`}
        >
            {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Pdf"
            }
        </PDFDownloadLink>
    )
}
const thStyle = {
    fontFamily: "Anton",
    fontWeight: "normal",
    fontStyle: "normal"
  };
const Info= forwardRef((props,ref)=>{
    const data=props?.data||{}
    if (Object.keys(data).length<=0)return <></>
    return (
        <div {...props} className={"document "+props.className} ref={ref} >
            <h1>{data["last name"]}, {data["first name"]}</h1>
            <div>
                <h2>Personal info</h2>
                <div>Full address: <span>{data["street address"]}, {data["zip"]}</span></div>
                <div>DOB: <span>{data["birth date"]}</span></div>
                <div>Gender: <span>{data["gender"]}</span></div>
                <div>Phone: <span>{data["phone"]}</span></div>
                <div>Email: <span>{data["email"]}</span></div>
                {(data?.["leave a message"]===undefined)?null:<div>{"leave a message"}: <span>{data["leave a message"]}</span></div>}
                {(data?.["preferred point of contact"]===undefined)?null:<div>{"preferred point of contact"}: <span>{data["preferred point of contact"]}</span></div>}
                {(data?.["best time to contact"]===undefined)?null:<div>{"best time to contact"}: <span>{data["best time to contact"]}</span></div>}
                {(data?.["employer"]===undefined)?null:<div>{"employer"}: <span>{data["best time to contact"]}</span></div>}
                {(data?.["convicted of a felony"]===undefined)?null:<div>{"relationship status"}: <span>{data["best time to contact"]}</span></div>}
                {(data?.["convicted of a felony"]===undefined)?null:<div>{"convicted of a felony"}: <span>{data["best time to contact"]}</span></div>}
            </div>
            <div>
                {
                    (Object.keys(data).filter(value=>value.includes("fille")).length>0)?<h2>Filler info</h2>:null
                }
                {
                    Object.keys(data).filter(value=>value.includes("fille")).map(key=>{
                        return <div>{key}: <span>{data[key]}</span></div>
                    })
                }
            </div>
            <div>
                {
                    (Object.keys(data).filter(value=>value.includes("reference")).length>0)?<h2>Reference info</h2>:null
                }
                {
                    Object.keys(data).filter(value=>value.includes("reference")).map(key=>{
                        return <div>{key}: <span>{data[key]}</span></div>
                    })
                }
            </div>
            <div>
                {
                    (Object.keys(data).filter(value=>value.includes("emergency")).length>0)?<h2>Emergency Contact info</h2>:null
                }
                {
                    Object.keys(data).filter(value=>value.includes("emergency")).map(key=>{
                        return <div>{key}: <span>{data[key]}</span></div>
                    })
                }
            </div>
            <div>
                {(data?.["date of diagnosis"]===undefined)?null:<h2>Cancer & doctor info</h2>}
                {(data?.["date of diagnosis"]===undefined)?null:<div>{"date of diagnosis"}: <span>{data["date of diagnosis"]}</span></div>}
                {(data?.["diagnosis status"]===undefined)?null:<div>{"diagnosis status"}: <span>{data["diagnosis status"]}</span></div>}
                {(data?.["doctor first name"]===undefined)?null:<div>{"doctor first name"}: <span>{data["doctor first name"]}</span></div>}
                {(data?.["doctor last name"]===undefined)?null:<div>{"doctor last name"}: <span>{data["doctor first name"]}</span></div>}
                {(data?.["doctor phone"]===undefined)?null:<div>{"doctor phone"}: <span>{data["doctor first name"]}</span></div>}
            </div>
            <div>
                {(data?.["walker, crutches, wheelchair"]===undefined)?null:<h2>Personal Health</h2>}
                {(data?.["walker, crutches, wheelchair"]===undefined)?null:<div>{"walker, crutches, wheelchair"}: <span>{data["walker, crutches, wheelchair"]}</span></div>}
                {(data?.["allergies"]===undefined)?null:<div>{"allergies"}: <span>{data["allergies"]}</span></div>}
                {(data?.["medical conditions"]===undefined)?null:<div>{"medical conditions"}: <span>{data["allergies"]}</span></div>}
                {(data?.["living conditions explanation"]===undefined)?null:<div>{"living conditions explanation"}: <span>{data["allergies"]}</span></div>}
            </div>
            <div>
                {(data?.["program selection"]===undefined)?null:<h2>Program selection & prayer</h2>}
                {(data?.["program selection"]===undefined)?null:<div>{"program selection"}: <span>{data["program selection"]}</span></div>}
                {(data?.["religious beliefs"]===undefined)?null:<div>{"religious beliefs"}: <span>{data["religious beliefs"]}</span></div>}
                {(data?.["been a christian"]===undefined)?null:<h2>Faith</h2>}
                {(data?.["been a christian"]===undefined)?null:<div>{"been a christian"}: <span>{data["been a christian"]}</span></div>}
                {(data?.["rock attendance"]===undefined)?null:<div>{"rock attendance"}: <span>{data["rock attendance"]}</span></div>}
                {(data?.["rock campus"]===undefined)?null:<div>{"rock campus"}: <span>{data["rock attendance"]}</span></div>}
                {(data?.["serving interests"]===undefined)?null:<div>{"serving interests"}: <span>{data["rock attendance"]}</span></div>}
                {(data?.["consider leader"]===undefined)?null:<div>{"consider leader"}: <span>{data["rock attendance"]}</span></div>}
                {(data?.["commit to 6 month of service"]===undefined)?null:<div>{"commit to 6 month of service"}: <span>{data["rock attendance"]}</span></div>}
                {(data?.["past volunteer experience"]===undefined)?null:<div>{"past volunteer experience"}: <span>{data["rock attendance"]}</span></div>}
                {(data?.["open to prayer"]===undefined)?null:<div>{"open to prayer"}: <span>{data["religious beliefs"]}</span></div>}
            </div>
            <div>
                {
                    (Object.keys(data).filter(value=>value.includes("inancial")).length>0)?<h2>Financial info</h2>:null
                }
                {
                    Object.keys(data).filter(value=>value.includes("inancial")).map(key=>{
                        return <div>{key}: <span>{data[key]}</span></div>
                    })
                }
            </div>
            <div>
                {(data?.["testimony of being saved"]===undefined)?null:<h2>Testimony and explanations</h2>}
                {(data?.["testimony of being saved"]===undefined)?null:<div>{"testimony of being saved"}: <span>{data["testimony of being saved"]}</span></div>}
                {(data?.["testimoncy of cancer"]===undefined)?null:<div>{"testimoncy of cancer"}: <span>{data["testimoncy of cancer"]}</span></div>}
                {(data?.["why volunteer question"]===undefined)?null:<div>{"why volunteer question"}: <span>{data["testimoncy of cancer"]}</span></div>}
                {(data?.["most difficult for volunteering question"]===undefined)?null:<div>{"most difficult for volunteering question"}: <span>{data["testimoncy of cancer"]}</span></div>}
                {(data?.["describe a difficult situation question"]===undefined)?null:<div>{"describe a difficult situation question"}: <span>{data["testimoncy of cancer"]}</span></div>}
                {(data?.["healthy boundaries question"]===undefined)?null:<div>{"healthy boundaries question"}: <span>{data["testimoncy of cancer"]}</span></div>}
            </div>
        </div>
    )
})
export function ToPrint(props){
    const ref = useRef();
    const printCurrent = useReactToPrint({content:_=>ref.current}) 
    function onClick(){
        console.log(ref.current)
        printCurrent()
    }
    if (Object.keys(props.data).length<=0)return <></>
    return (
        <>
            <ReactToPrint
                trigger={_=><button onClick={onClick}>print</button>}
                content={_=>ref.current}
            />
            <div className="hide-print">
                <Info ref={ref} {...props}/>
            </div>
            <Info {...props} className="preview"/>
            
        </>
    )
}
