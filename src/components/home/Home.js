import React from "react";
import Navbar from "../Navigation/Navbar";
import "./Home.css";

const Home = ({props = []}) => {
    return (
        <>
            <Navbar logo={"WeatherSpeaks"} navitems={["Home", "Pricing", "City"]} />

            <div className="weather-details-div card">
                <div className="card-head">
                    img
                </div>

                <div className="card-body">

                </div>
                <div>
                    <div>{props.map((item, index) => {
                    let newDate = new Date(item.dt * 1000);
                    let month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
                        return (
                            <div className="card" key={"index"}>
                                <h3>"city"</h3>
                                <div className="card-head">
                                    <img src="" alt="climeImg" srcset="" />
                                </div>
                                <div className="card-body">
                                    
                                </div>
                            </div>
                    )
                    })}
                    </div>
                </div>  
                
            </div>
        </>
    )
}

export default Home;