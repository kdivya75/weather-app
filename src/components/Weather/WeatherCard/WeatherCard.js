import "./WeatherCard.css"


function WeatherCard(props) {
    const { data } = props;
    const iconUrl = data.type==="weather" ? `https://openweathermap.org/img/wn/${data.icon}@4x.png`: data.icon;
    return(
        <div className="weatherCard">
            <div className="heading">
                <h4 className="title">{data.type==="weather" ? "Current Weather": "Other Conditions"}</h4>
                <span>{data.city}, {data.country}</span>
          
            </div>
          
            <div className="cardContent">
                <div className="iconContainer">
                 
                    <img src={iconUrl} alt="icon"/>
                    <span className="temp">
                       {data.mainValue}
                    </span>
                    <p className="condition">{data.type === "weather" ? data.conditions : null}</p>
                </div>
                <div className="summary">
                <ul>
                    {data.summary.map((each, index) =>  <li key={index}>{each.label}<span>{each.value}</span></li>)}
                </ul>

                   
                </div>
            </div>
        
        </div>
    )
}

export default WeatherCard;