import { useEffect, useState, useRef } from "react";
import Axios from "./api/axios";
import { useNavigate } from "react-router-dom";


const PROPERTY_URL = "/uploadprop"

const PropUpload = () => {


    const [propertyPurpose, setPropertyPurpose] = useState("Select the property type");
    const [propertyType, setPropertyType] = useState("Select the property type");
    const [landType, setLandType] = useState("")
    const [facilities, setFacilities] = useState("")
    const [errMsg, setErrMsg] = useState("");
    useEffect(() => {
        console.log(propertyPurpose);
    }, [propertyPurpose])
    useEffect(() => {
        console.log(propertyType);
    }, [propertyType])
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios.post(PROPERTY_URL, { propertyPurpose })
            console.log(response);
            console.log(response.data.message);
            setErrMsg(response.data.message)
        } catch (error) {
            if (error.response?.status === 411) {
                setErrMsg("Please Fill")
                setTimeout(() => {
                    setErrMsg("")
                }, 2000);
            }
        }
    }
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/Login");
    };

    return (
        <section className="uploadprop">
            <p>{errMsg}</p>
            <h2>Hi Emmanuel, welcome to your dashboard</h2>
            <div>
                <h1>Upload a Property</h1>
                <form onSubmit={handleSubmit}>

                    <div className="upload-property-section">
                        <div className="column1">
                        <select>
                                <option>Available For?</option>
                                <option>Buy</option>
                                <option>Rent</option>
                                <option>Lease</option>
                            </select>
                            <select className="propertyPurpose" onClick={(e) => {
                                setPropertyPurpose(e.target.value)
                                // setPropType(e.target)
                            }}>
                                <option>Property Pupose</option>
                                <option>Commercial</option>
                                <option>Residential</option>
                            </select>
                            <div className={propertyPurpose === "Commercial" ? "show" : "hide"}>
                                <div>
                                    <select onClick={(e) => {
                                        setPropertyType(e.target.value);
                                    }}>
                                        <option>Property Type</option>
                                        <option>Flat</option>
                                        <option>Duplex</option>
                                        <option>Shopping Complex</option>
                                        <option>Bungalow</option>
                                        <option>Story Building</option>
                                        <option>Land</option>
                                        <option>Filling Station</option>
                                        <option>Warehouse</option>
                                        <option>Hotel/Motel/Guest House</option>
                                    </select>
                                    <div className={propertyType === "Flat" || propertyType === "Duplex" || propertyType === "Bungalow" ? "show" : "hide"}>
                                        <select>
                                            <option>Number fo Bedroom</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>others</option>
                                        </select>
                                    </div>
                                    <div className={propertyType === "Shopping Complex" ? "show" : "hide"}>
                                        <select>
                                            <option>suites</option>
                                            <option>1-20</option>
                                            <option>21-40</option>
                                            <option>41-60</option>
                                            <option>61-100</option>
                                            <option>100+</option>
                                        </select>
                                    </div>
                                    <div className={propertyType === "Story Building" ? "show" : "hide"}>
                                        <select>
                                            <option>Story</option>
                                            <option>1-20</option>
                                            <option>21-40</option>
                                            <option>41-60</option>
                                            <option>61-100</option>
                                            <option>100+</option>
                                        </select>
                                    </div>
                                    <div className={propertyType === "Land" ? "show landFlex" : "hide"}>
                                        <select onClick={(e) => {
                                            setLandType(e.target.value)
                                        }}>
                                            <option>Plot</option>
                                            <option>Acres</option>
                                            <option>Hectres</option>
                                        </select>
                                        <div className={landType === "Plot" || landType === "Acres" || landType === "Hectres" ? "show" : "hide"}>
                                            <input type="number" placeholder="No of plot/acres/hectres" />
                                        </div>
                                    </div>
                                    <div className={propertyType === "Filling Station" ? "show landFlex" : "hide"}>
                                        <label>How many fuel pumps?</label>
                                        <input type="number" placeholder="Enter number" />
                                    </div>
                                    <div className={propertyType === "Warehouse" ? "show landFlex" : "hide"}>
                                        <input type="number" placeholder="Size(square metre)" />
                                    </div>
                                    <div className={propertyType === "Hotel/Motel/Guest House" ? "show landFlex" : "hide"}>
                                        <select>
                                            <option>Number of rooms</option>
                                            <option>1-10</option>
                                            <option>10-20</option>
                                            <option>20-30</option>
                                            <option>30-40</option>
                                            <option>40-50</option>
                                            <option>50+</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className={propertyPurpose === "Residential" ? "show" : "hide"}>
                                <div>
                                    <select onClick={(e) => {
                                        setPropertyType(e.target.value);
                                    }}>
                                        <option>Property Type</option>
                                        <option>Flat</option>
                                        <option>Duplex</option>
                                        <option>Shopping Complex</option>
                                        <option>Bungalow</option>
                                        <option>Story Building</option>
                                        <option>Land</option>
                                    </select>
                                    <div className={propertyType === "Flat" || propertyType === "Duplex" || propertyType === "Bungalow" ? "show" : "hide"}>
                                        <select>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>others</option>
                                        </select>
                                    </div>
                                    <div className={propertyType === "Shopping Complex" ? "show" : "hide"}>
                                        <select>
                                            <option>suites</option>
                                            <option>1-20</option>
                                            <option>21-40</option>
                                            <option>41-60</option>
                                            <option>61-100</option>
                                            <option>100+</option>
                                        </select>
                                    </div>
                                    <div className={propertyType === "Story Building" ? "show" : "hide"}>
                                        <select>
                                            <option>Story</option>
                                            <option>1-20</option>
                                            <option>21-40</option>
                                            <option>41-60</option>
                                            <option>61-100</option>
                                            <option>100+</option>
                                        </select>
                                    </div>
                                    <div className={propertyType === "Land" ? "show landFlex" : "hide"}>
                                        <select onClick={(e) => {
                                            setLandType(e.target.value)
                                        }}>
                                            <option>Plot</option>
                                            <option>Acres</option>
                                            <option>Hectres</option>
                                        </select>
                                        <div className={landType === "Plot" || landType === "Acres" || landType === "Hectres" ? "show" : "hide"}>
                                            <input type="number" placeholder="No of plot/acres/hectres" />
                                        </div>
                                    </div>
                                    <div className={propertyType === "Filling Station" ? "show landFlex" : "hide"}>
                                        <label>How many fuel pumps?</label><br />
                                        <input type="number" placeholder="Enter number" />
                                    </div>
                                    <div className={propertyType === "Warehouse" ? "show landFlex" : "hide"}>
                                        <input type="number" placeholder="Size(square metre)" />
                                    </div>
                                    <div className={propertyType === "Hotel/Motel/Guest House" ? "show landFlex" : "hide"}>
                                        <select>
                                            <option>Number of rooms</option>
                                            <option>1-10</option>
                                            <option>10-20</option>
                                            <option>20-30</option>
                                            <option>30-40</option>
                                            <option>40-50</option>
                                            <option>50+</option>
                                        </select>
                                    </div>

                                </div>

                            </div>

                            <select className="propertyPurpose">
                                <option>Number of Bathroom?</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>others</option>
                            </select>
                            <select className="propertyPurpose">
                                <option>Number of Toilet?</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>others</option>
                            </select>
                            
                            <input type="text" placeholder="State" />
                            <input type="text" placeholder="Local Government Area" />
                            <input type="text" placeholder="Land mark/Nearest Bus stop" />
                            <input type="text" placeholder="Street name" />
                            <input type="text" placeholder="Building Number/ Plot no" />
                            <input type="number" placeholder="Price" />
                            <div className="budget-container">
                                <label>Budget:</label>
                                <input type="text" placeholder="From" />
                                <input type="text" placeholder="To" />
                            </div>

                        </div>
                    </div>
                    <br />
                    <button>submit</button>
                    <button onClick={navigateToLogin}>log out</button>
                </form>
            </div>
        </section>
    )
}

export default PropUpload;