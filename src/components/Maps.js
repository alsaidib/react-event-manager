import React from "react"
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { Popup, Icon, Header, Button } from 'semantic-ui-react'
import { style } from "./mapstyles";

// Icon, Tooltip
const Maps = function (props) {

    const Map = ReactMapboxGl({
        accessToken: "xxxxxxxxxxxxxxxxxx"
    });

    return (
        <div>
            <Map
                style={style}
                fitBounds={props.getCoordinates()}
                fitBoundsOptions={{ padding: 10, linear: true, offset: [0, 30] }}
                containerStyle={{
                    height: "700px",
                    width: "100%"
                }}>
                {props.events.map((event, index) => {
                    // const coordinate = (event.location.lat, event.location.lng);
                    // console.log(event.location);
                    return (
                        <Marker key={index} coordinates={[event.location.lng, event.location.lat]} anchor="bottom">
                            <Popup trigger={<Icon name="heart" color="green" size="large" />} flowing hoverable >
                                <Header size="small">{event.title}</Header>
                                <p>{event.city}</p>
                                <Button>More info</Button>
                            </Popup>
                        </Marker>
                    );
                }
                )
                }
            </Map>
        </div>
    )
}

export default Maps;
