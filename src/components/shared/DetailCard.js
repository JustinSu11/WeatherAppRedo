import React from "react"
import "./detailCard.css"

function DetailCard(props) {
    return <div className="city-detail-card">{props.children}</div>
}

export default DetailCard