import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import '../styles/Dashboard.css'
import '../styles/Navbar.css'
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/products';
import { getTicketByNumber, getTicketId, postTickets } from '../redux/actions/tickets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import fileDownload from 'js-file-download'
import { getFarmer } from '../redux/actions/farmer';
import Alerts from '../components/Alert';
import { URL } from '../components/url';
import moment from 'moment';



function Dashboard() {
    const handle = useFullScreenHandle();

    const products = useSelector(state => state.products)

    // const farmerData = useSelector(state => state.farmer)
    // const alerts = useSelector(state => state.alert)

    // console.log('farmer==', farmerData)

    const dispatch = useDispatch()

    const [allTickets, setAllTickets] = useState([])

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [isMaximized, setIsMaximized] = useState(false)
    const [id, setId] = useState('')
    // const [citiesToken, setCitiesToken] = useState('')
    const [indianState, setIndianState] = useState('')
    const [files, setFiles] = useState([])
    const[mobileNo, setMobileNo] = useState('')
    const[ticketNumber, setTicketNumber] = useState('')
    const[solution, setSolution] = useState('')
    const[connectStatus, setConnectStatus] = useState('')
    // const[state, setState] = useState('')
    const[district, setDistrict] = useState('')
    const[regDate, setRegDate] = useState('')
    const[village, setVillage] = useState('')
    const[tehsilDar, setTehsil] = useState('')
    const[pinCode, setPinCode] = useState('')
    const[saleS1, setSaleS1] = useState('')
    const[saleS2, setSaleS2] = useState('')
    const[saleS3, setSaleS3] = useState('')
    const[farmerName, setFarmerName] = useState('')
    const[crop1, setCrop1] = useState('')
    const[product1, setProduct1] = useState('')
    const[acreAge1, setAcreAge1] = useState('')
    const[crop2, setCrop2] = useState('')
    const[product2, setProduct2] = useState('')
    const[acreAge2, setAcreAge2] = useState('')
    const[crop3, setCrop3] = useState('')
    const[product3, setProduct3] = useState('')
    const[acreAge3, setAcreAge3] = useState('')
    const[callType, setCallType] = useState('')
    const[callRelated, setCallRelated] = useState('')
    const[callSource, setCallSource] = useState('')
    const[callCrop, setCallCrop] = useState('')
    const[callProduct, setCallProduct] = useState('')
    const[department, setDepartment] = useState('')
    const[ticketStatus, setTicketStatus] = useState('')
    const[remarks, setRemarks] = useState('')
    const[query, setQuery] = useState('')
    const[regType, setRegType] = useState('')
    const[clientFiles, setClientFiles] = useState([])

    const[ticketData, setTicketData] = useState([])
    const[farmerData, setFarmerData] = useState([])


    const getTicketById = async(ev) => {
      setIsLoading(true)
      // dispatch(getTicketId(ev.target.getAttribute('name')))
      const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
      }
      let Id = ev.target.getAttribute('name')
      const res = await axios.get(`${URL}/ticket/${Id}`,config)
      setTicketData([res.data.data])
    }

    useEffect(() => {
        console.log('ticketdata=========',ticketData)
        if(ticketData.length > 0){
          setTicketNumber(ticketData[0].TicketNumber)
          setId(ticketData[0]._id)
          setIndianState(ticketData[0].State)
          setDistrict(ticketData[0].District)
          setTehsil(ticketData[0].Tehsil)
          setVillage(ticketData[0].Village)
          setRegDate(ticketData[0].Ticket_Created_At)
          setQuery(ticketData[0].QueryRaised)
          setCrop1(ticketData[0].Crop_1)
          setCrop2(ticketData[0].Crop_2)
          setCrop3(ticketData[0].Crop_3)
          setDepartment(ticketData[0].Department)
          setProduct1(ticketData[0].Product_1)
          setProduct2(ticketData[0].Product_2)
          setProduct3(ticketData[0].Product_3)
          setPinCode(ticketData[0].Pincode)
          setSaleS1(ticketData[0].Sale_S1)
          setSaleS2(ticketData[0].Sale_S2)
          setSaleS3(ticketData[0].Sale_S3)
          setAcreAge1(ticketData[0].AcreAge1)
          setAcreAge2(ticketData[0].AcreAge2)
          setAcreAge3(ticketData[0].AcreAge3)
          setCallType(ticketData[0].CallType)
          setCallSource(ticketData[0].CallSource)
          setTicketStatus(ticketData[0].Status)
          setRemarks(ticketData[0].Remarks)
          setSolution(ticketData[0].Solution)
          setClientFiles(ticketData[0].MediaClient)
          setConnectStatus(ticketData[0].Connect_Status)
          setMobileNo(ticketData[0].MobileNo)
          setCallRelated(ticketData[0].CallRelated)
          setCallCrop(ticketData[0].ForCrop)
          setCallProduct(ticketData[0].ForProduct)
          setRegType(ticketData[0].Reg_Type)
          // setFarmerName(farmerData[0].Name)
          // console.log(ticketData[0].MediaClient)
        }
        if(farmerData){
          console.log('farmerData',farmerData)
          setFarmerName(farmerData.Name)
        } else {
          setFarmerName('')
        }

        setIsLoading(false)

    }, [ticketData, farmerData])

    const stateSelected = (ev) => {
        // let stateId = ev.target.value 
        // let state = states.find((element) => element.id == stateId)
        // setState(state)
        setIndianState(ev.target.value )
    }
    
    const districtSelected = (ev) => {
        setDistrict(ev.target.value )
    }
    
    const tehsilSelected = (ev) => {
        setTehsil(ev.target.value)
    }

    useEffect(() => {
      dispatch(getProduct())
    }, [])
    

    const states = [
        {id: 1, name: 'Andaman And Nicobar'},
        { id: 2, name: 'Andhra Pradesh' },
        { id: 3, name: 'Arunachal Pradesh' },
        { id: 4, name: 'Assam' },
        { id: 5, name: 'Bihar' },
        { id: 6, name: 'Chhattisgarh' },
        { id: 7, name: 'Delhi' },
        { id: 8, name: 'Gujarat' },
        { id: 9, name: 'Haryana' },
        { id: 10, name: 'Himachal Pradesh' },
        { id: 11, name: 'Jammu And Kashmir' },
        { id: 12, name: 'Jharkhand' },
        { id: 13, name: 'Karnataka' },
        { id: 14, name: 'Lakshadweep' },
        { id: 15, name: 'Madhya Pradesh' },
        { id: 16, name: 'Maharashtra' },
        { id: 17, name: 'Odisha' },
        { id: 18, name: 'Puducherry' },
        { id: 19, name: 'Punjab' },
        { id: 20, name: 'Rajasthan' },
        { id: 21, name: 'Tamil Nadu' },
        { id: 22, name: 'Telangana' },
        { id: 23, name: 'Tripura' },
        { id: 24, name: 'Uttar Pradesh' },
        { id: 25, name: 'Uttarakhand' },
        { id: 26, name: 'West Bengal' },
        { id: 27, name: 'Others' },
    ]

    const numberChange = async(ev) => {

      if(ev.target.value.length !== 10){
        setIsError(true)
      }

      setMobileNo(ev.target.value)
      
      if(ev.target.value.length === 10){
        setIsLoading(true)
        console.log(ev.target.value)
        const config = {
          headers: {
              "Access-Control-Allow-Origin": "*",
              'Content-Type': 'application/json'
          }
        }

        // dispatch(getFarmer(ev.target.value))
        const bod = JSON.stringify({mobileNo:ev.target.value})
        const reponse = await axios.post(`${URL}/farmer`,bod, config)
        setFarmerData(reponse.data.data)
        
        const  body = JSON.stringify({mobileNo:ev.target.value})
        const res = await axios.post(`${URL}/ticket/mobile`,body, config)
        setAllTickets(res.data.data)
        setTicketData(res.data.data)
        setIsLoading(false)
      }     
    }
    
    const filesSelected = (ev) => {
      // console.log(selectedFiles)
      setFiles(ev.target.files)
    }

    const downloadFile = async(ev) => {
      // console.log(ev.target.getAttribute('name'))

      setIsLoading(true)
      let fileId = ev.target.getAttribute('name')

      const config = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
        }
      }
      let response = await axios.get(`${URL}/download/${fileId}`, 
      {
        responseType: 'blob'
      }, config)

      if(response.headers['content-type'] === 'image/jpeg')
      {
        console.log(response.headers['content-type'])
        fileDownload(response.data, `${Date.now()}.jpg`)
      } else {
        fileDownload(response.data, `${Date.now()}.txt`)
      }
    
    //   axios({
    //     url:`${URL}/download/${fileId}`,
    //     method: "GET",
    //     responseType: "blob",
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Content-Type": "application/json",
    //       Accept: "application/json"
    //     }
    //   })
    //     .then(function (response) {
    //       console.log('response====', response)
    //       if(response.headers['content-type'] === 'image/jpeg')
    //       {
    //         console.log(response.headers['content-type'])
    //         fileDownload(response.data, `${Date.now()}.jpg`)
    //       } else {
    //         fileDownload(response.data, `${Date.now()}.txt`)
    //       }
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    setIsLoading(false)
    }

   const createNewTicket = async(ev) => {

    ev.preventDefault()
    setIsLoading(true)

    var formData = new FormData();


    for (let i=0; i<files.length; i++) {
      formData.append('files', files[i])
    }      

    let postData = {
      "state": indianState,
      "mobileNo": mobileNo,
      "district": district,
      "date": regDate,
      "village": village,
      "tehsil": tehsilDar,
      "pinCode": pinCode,
      "name": farmerName,
      "crop1": crop1,
      "crop2": crop2,
      "crop3": crop3,
      "product1": product1,
      "acreAge1": acreAge1,
      "acreAge2": acreAge2,
      "acreAge3": acreAge3,
      "callType": callType,
      "callSource": callSource,
      "callCrop": callCrop,
      "callRelated": callRelated,
      "callProduct": callProduct,
      "department": department,
      "status": ticketStatus,
      "remarks": remarks,
      "queryRaised": query,
      "farmerName": farmerName,
      "connectStatus":connectStatus,
      "solution":solution,
      "forCrop":callCrop,
      "forProduct":callProduct,
      "regType": regType
    }

    const config = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify(postData)  

    const res = await axios.post(`${URL}/ticket`,body, config)

    // console.log(res.data.data)

    formData.append('id', res.data.data._id)

  // const res = await axios.post(`${URL}/request/upload`,formData, config)

  // console.log('alerts=====',alerts)
  if(mobileNo.toString().length === 10){
    setTicketNumber('')
    setId('')
    setIndianState('')
    setDistrict('')
    setTehsil('')
    setVillage('')
    setRegDate('')
    setQuery('')
    setCrop1('')
    setCrop2('')
    setCrop3('')
    setDepartment('')
    setProduct1('')
    setProduct2('')
    setProduct3('')
    setPinCode('')
    setSaleS1('')
    setSaleS2('')
    setSaleS3('')
    setAcreAge1('')
    setAcreAge2('')
    setAcreAge3('')
    setCallType('')
    setCallSource('')
    setTicketStatus('')
    setRemarks('')
    setSolution('')
    setClientFiles([])
    setAllTickets([])
    setFiles([])
    setMobileNo('')
    setFarmerName('')
    setConnectStatus('')
    setCallRelated('')
    setRegType('')
  }

  setIsLoading(false)
}


const submitData = async(ev) => {
    ev.preventDefault()

    setIsLoading(true)

    var formData = new FormData();

    for (let i=0; i<files.length; i++) {
        formData.append('files', files[i])
    }      
    // const config = {
    //   headers: {
    //       'Content-Type': 'application/json'
    //   }
    // } 

    formData.append('id', id)
    let postData = {
      "id": id,
      "state": indianState,
      "mobileNo": mobileNo,
      "ticketNumber": ticketNumber,
      "district": district,
      "date": regDate,
      "village": village,
      "tehsil": tehsilDar,
      "pinCode": pinCode,
      "name": farmerName,
      "crop1": crop1,
      "crop2": crop2,
      "crop3": crop3,
      "product1": product1,
      "acreAge1": acreAge1,
      "acreAge2": acreAge2,
      "acreAge3": acreAge3,
      "callType": callType,
      "callSource": callSource,
      "callCrop": callCrop,
      "callRelated": callRelated,
      "callProduct": callProduct,
      "department": department,
      "status": ticketStatus,
      "remarks": remarks,
      "queryRaised": query,
      "farmerName": farmerName,
      "connectStatus":connectStatus,
      "solution":solution,
      "forCrop":callCrop,
      "forProduct":callProduct,
      "regType": regType
    }

    const config = {
      headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    }

    // const res = await axios.post(`${URL}/request/upload`,formData, config)

    dispatch(postTickets(postData))

    // console.log('alerts=====',alerts)
    if(mobileNo.toString().length === 10){
      setTicketNumber('')
      setId('')
      setIndianState('')
      setDistrict('')
      setTehsil('')
      setVillage('')
      setRegDate('')
      setQuery('')
      setCrop1('')
      setCrop2('')
      setCrop3('')
      setDepartment('')
      setProduct1('')
      setProduct2('')
      setProduct3('')
      setPinCode('')
      setSaleS1('')
      setSaleS2('')
      setSaleS3('')
      setAcreAge1('')
      setAcreAge2('')
      setAcreAge3('')
      setCallType('')
      setCallSource('')
      setTicketStatus('')
      setRemarks('')
      setSolution('')
      setClientFiles([])
      setAllTickets([])
      setFiles([])
      setMobileNo('')
      setFarmerName('')
      setConnectStatus('')
      setCallRelated('')
      setCallCrop('')
      setCallProduct('')
      setRegType('')
    }

    setIsLoading(false)

    // console.log(res)
  }


    return (
        <div className='dashboardContainer'>
            {/* <FullScreen className='fullscreen' handle={handle}> */}
                <Navbar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} isMaximized={isMaximized} setIsMaximized={setIsMaximized} />
                <div className='mainBody'>
                    <div className='dashboardBodyWrapper'>
                        {sideBarOpen ? <Sidebar class={'sidebarMain open'} /> : <Sidebar class={'sidebarMain close'} />}
                        <div className='dashboardFormContainer'>
                            <div className='mainPageBody'>
                                <div className='pageWrapper'>
                                    <div className='dashboardFormDiv'>
                                      {isLoading && <Spinner animation="border" />}
                                        <div className='paddingDiv'>      
                                            <div className='inputListContainer'>                                                
                                                    <div className='dhanukaHeading'>
                                                        Dhanuka Farmer Validation CRM
                                                    </div>
                                                    <div className='allTickets'>
                                                      All Tickets associated with this number:-
                                                      {
                                                        allTickets.map((ticket)=>(
                                                          <div className="ticketHolder" name={ticket._id} onClick={(e)=>getTicketById(e)}>
                                                            <div className='ticket'>
                                                              {ticket.TicketNumber}
                                                            </div>
                                                          </div>
                                                        ))
                                                      }
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Mobile No: *</p>
                                                            <input className='inputStyle' error={isError} value={mobileNo} onChange={numberChange}/>
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Ticket No.s: *</p>
                                                            <input className='inputStyle' value={ticketNumber} onChange={(e) => setTicketNumber(e.target.value)}/>
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Reg Date: *</p>
                                                            <input value={regDate && moment(regDate).format('DD/MM/YYYY')} className='inputStyle rOnly' readOnly/>
                                                        </div>
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Reg. Type: *</p>
                                                            <input className='inputStyle' value={regType} onChange={(e) => setRegType(e.target.value)}/>
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>State: *</p>
                                                            <select value={indianState} className='inputStyle' id="state" name="state" onChange={(e) => stateSelected(e)}>
                                                                <option value="">Select</option>
                                                                {states.map((state) => (
                                                                    <option value={state.name}>{state.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>District: *</p>
                                                            <input value={district} className='inputStyle' id="district" name="district" onChange={(e) => districtSelected(e)} />
                                                            {/* <select value={district} className='inputStyle' id="district" name="district" onChange={(e) => districtSelected(e)}>
                                                                <option value="">Select</option>
                                                                {districts.map((cities) => (
                                                                    cities.state === indianState ? <option value={cities.city}>{cities.city}</option> : null
                                                                ))}
                                                            </select> */}
                                                        </div>
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Tehsil: *</p>
                                                            <input onChange={tehsilSelected} className='inputStyle' id="tehsil" name="tehsil" value={tehsilDar} />
                                                            {/* <select onChange={tehsilSelected} className='inputStyle' id="tehsil" name="tehsil" value={tehsilDar}>
                                                                <option value="">Select</option>
                                                                {tehsil.map((ts) => (
                                                                  <option value={ts.name}>{ts.name}</option>
                                                                ))}
                                                            </select> */}
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Village: *</p>
                                                            <input className='inputStyle' id="village" name="village" value={village} onChange={(e) => setVillage(e.target.value)}/>
                                                            {/* <select onChange={(e) => setVillage(e.target.value)} className='inputStyle' id="village" name="village" value={village}>
                                                                <option value="">Select</option>
                                                            </select> */}
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Pin Code: *</p>
                                                            <input className='inputStyle' type="number" value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>
                                                        </div>
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Sale S1: *</p>
                                                            <input className='inputStyle' value={saleS1} onChange={(e) => setSaleS1(e.target.value)} />
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Sale S2: *</p>
                                                            <input className='inputStyle' value={saleS2} onChange={(e) => setSaleS2(e.target.value)} />
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Sale S3: *</p>
                                                            <input className='inputStyle' value={saleS3} onChange={(e) => setSaleS3(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Farmer Name: *</p>
                                                            <input className='inputStyle' value={farmerName} onChange={(e) => setFarmerName(e.target.value)}/>
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Crop 1: *</p>
                                                            <input className='inputStyle' id="crop1" name="crop1" value={crop1} onChange={(e) => setCrop1(e.target.value)}/>
                                                            {/* <select className='inputStyle' id="crop1" name="crop1" value={crop1} onChange={(e) => setCrop1(e.target.value)}>
                                                                <option value="">Select</option>
                                                                {crops.map((val) => (
                                                                  <option value={val.crop}>{val.crop}</option>
                                                                ))}
                                                            </select> */}
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Product 1: *</p>
                                                            <input className='inputStyle' id="product1" name="product1" value={product1} onChange={(e) => setProduct1(e.target.value)}/>
                                                            {/* <select className='inputStyle' id="product1" name="product1" value={product1} onChange={(e) => setProduct1(e.target.value)}>
                                                                <option value="">Select</option>
                                                                {products && products.map((val,index) => (
                                                                  <option value={index}>{val.product}</option>
                                                                ))}
                                                            </select> */}
                                                        </div>
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Acre Age 1: *</p>
                                                            <input className='inputStyle' value={acreAge1} onChange={(e) => setAcreAge1(e.target.value)}/>
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Crop 2: *</p>
                                                            <input className='inputStyle' value={crop2} onChange={(e) => setCrop2(e.target.value)} />
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Product 2: *</p>
                                                            <input className='inputStyle' value={product2} onChange={(e) => setProduct2(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Acre Age 2: *</p>
                                                            <input className='inputStyle' value={acreAge2} onChange={(e) => setAcreAge2(e.target.value)}/>
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Crop 3: *</p>
                                                            <input className='inputStyle' value={crop3} onChange={(e) => setCrop3(e.target.value)} />
                                                        </div>
                                                        <div className='inputVals'>
                                                            <p>Product 3: *</p>
                                                            <input className='inputStyle' value={product3} onChange={(e) => setProduct3(e.target.value)}/>
                                                        </div>
                                                    </div>
                                                    <div className='rowContainer'>
                                                        <div className='inputVals'>
                                                            <p>Acre Age 3: *</p>
                                                            <input className='inputStyle' value={acreAge3} onChange={(e) => setAcreAge3(e.target.value)} />
                                                        </div>
                                                    </div>
                                            </div>
                                            <table className="tableContainer">
                                                <tbody className='tableBody'>
                                                    <tr>
                                                        <td class="complaint">Query Raised: </td>
                                                        <td class="complaint"><textarea value={query} class="form-control" name="query" onChange={(e) => setQuery(e.target.value)}></textarea></td>
                                                        <td>Call Type: *</td> 
                                                        <td><select class="form-control" name="main_disp" id="main_disp" value={callType} onChange={(e) => setCallType(e.target.value)}>
                                                                <option value="">--Select--</option>
                                                                <option value="Query">Query</option>
                                                                <option value="Complaint">Complaint</option>
                                                                <option value="Request">Request</option>
                                                                <option value="Others">Others</option>
                                                            </select>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td>Call Related: *</td> 
                                                        <td><select class="form-control" name="main_disp" id="main_disp" value={callRelated} onChange={(e) => setCallRelated(e.target.value)}>
                                                                <option value="">--Select--</option>
                                                                <option value="qrcode">QR Code related</option>
                                                                <option value="others">Others</option>
                                                            </select>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td>Connect Status: *</td> 
                                                        <td><select class="form-control" name="main_disp" id="main_disp" value={connectStatus} onChange={(e) => setConnectStatus(e.target.value)}>
                                                                <option value="">--Select--</option>
                                                                <option value="connected">Connected</option>
                                                                <option value="not_connected">Not Connected</option>
                                                            </select>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td>Call Source: *</td>
                                                        <td><select class="form-control" name="source" value={callSource} onChange={(e) => setCallSource(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="TV Ads">TV Ads</option>
                                                            <option value="Posters / Banners">Posters / Banners</option>
                                                            <option value="Social Media">Social Media</option>
                                                            <option value="Website">Website</option>
                                                            <option value="Dhanuka Staff">Dhanuka Staff</option>
                                                            <option value="Other Farmer">Other Farmer</option>
                                                            <option value="Others">Others</option>
                                                        </select></td>
                                                        <td class="complaint">Solution Replied:</td> 
                                                        <td class="complaint">
                                                          {/* <textarea value={solution} class="form-control" name="solution" id="solution" onChange={(e) => setSolution(e.target.value)}></textarea>  */}
                                                          <select class="form-control" value={solution} name="solution" id="solution" onChange={(e) => setSolution(e.target.value)}>
                                                            <option value="">Select</option>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">No</option>
                                                            <option value="other">Other</option>
                                                          </select>
                                                        </td>
                                                    {/* <td>Issue Raised: *</td> 
                                                        <td><select class="form-control" name="issue" id="issue">
                                                                <option value="">--Select--</option>
                                                            </select>
                                                        </td> */}
                                                    </tr>
                                                    <tr class="question" >
                                                        <td>For which crop</td>
                                                        <td colSpan="3"><input type="text" class="form-control" name="question2" value={callCrop} onChange={(e) => setCallCrop(e.target.value)}/></td>
                                                    </tr> 
                                                    <tr class="question" >
                                                        <td>Which product</td>
                                                        <td colSpan="3"><input type="text" class="form-control" name="question1" value={callProduct} onChange={(e) => setCallProduct(e.target.value)}/></td>
                                                    </tr>
                                                    {/* <tr class="question" >
                                                        <td>What does he want to treat- Disease</td>
                                                        <td colSpan="3"><input type="text" class="form-control" name="question3" /></td>
                                                    </tr> */}
                                                    {/* <tr class="question">
                                                        <td>Question No 4</td>
                                                        <td><input type="text" class="form-control" name="question4" /></td>
                                                    </tr>
                                                    <tr class="question">
                                                        <td>Question No 5</td>
                                                        <td><input type="text" class="form-control" name="question5" /></td>
                                                    </tr>*/}
                                                    <tr>
                                                        <td>Which Department:</td>
                                                        <td><select class="form-control" name="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                                              <option value="">Select</option>
                                                              <option value="department1">Department 1</option>
                                                              <option value="department2">Department 2</option>
                                                            </select></td>
                                                        <td>Status:</td>
                                                        <td><select class="form-control" id="status" name="status" value={ticketStatus} onChange={(e) => setTicketStatus(e.target.value)}>
                                                            <option value="open">Open</option>
                                                            <option value="close">Closed</option>
                                                            <option value="na">NA</option>
                                                        </select></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Remarks</td> 
                                                        <td colSpan="3"><textarea class="form-control" id="remarks" name="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea></td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>Upload Image/Video</td>
                                                        <td colSpan="3"><input onChange={filesSelected} type="file" class="form-control" name="files" multiple /><pre>(Max. 45 MB Files Upload)</pre></td>
                                                    </tr> */}
                                                    <button type="submit" onClick={submitData}>Save</button>  
                                                    {/* <button type="submit" onClick={createNewTicket}>Create New</button>   */}
                                                    {/* {
                                                      clientFiles.map((files, index) => (
                                                        <div name={files} key={index} onClick={(e) => downloadFile(e)} className='fileView'>  
                                                          <FontAwesomeIcon className='fileSvg' icon={faFile} size="lg" />
                                                        </div>
                                                      ))
                                                    }     */}
                                                </tbody>
                                            </table>
                                            <Alerts />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
            {/* </FullScreen> */}
        </div>
    )
}

export default Dashboard


