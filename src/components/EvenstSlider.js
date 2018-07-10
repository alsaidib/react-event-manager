import React from 'react';
import Carousel from 'nuka-carousel';


class EventsSlider extends React.Component {

    render() {
        return (
            < Carousel >
                {
                    this.props.theMostLikedEvents.map((event, index) => (
                        <img src={event.img} alt="event" key={index} index={index} />
                    ))
                }
            </Carousel >
        );
    }
}


export default EventsSlider;














// import React from "react"

// const EventsSlider = props => (
//     <div>
//     </div>
// )


// export default EventsSlider;