import React from "react"
import "./components.css"

function DetailCard(props) {
    return <div className="city-detail-card">{props.children}</div>
}

export default DetailCard