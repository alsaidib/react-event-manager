import React from "react"
const EventDetail = props => (
    <div>
        <p>id: {props.match.params.id}</p>
        <p>event: {props.match.params.event}</p>
    </div>
)
export default EventDetail;