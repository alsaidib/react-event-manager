import React from 'react';
import { Card, Image, Icon, Button, Label } from 'semantic-ui-react';

import { Link } from "react-router-dom";
// import { Animated } from "react-animated-css";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { clean } from "./helpers";
//import { Scrollbars } from 'react-custom-scrollbars';


const cardStyle = {
    width: "45%",
    margin: "0"
}
const scrollStyle = {
    overflowY: 'scroll',
    maxHeight: "559px"
}
const divStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
}

class EventList extends React.Component {
    constructor(props) {
        super();
    }
    render() {

        return (
            <div style={scrollStyle}>


                <TransitionGroup appear style={divStyle}>
                    {this.props.events.map((event, index) => (
                        // <Animated key={index} isVisible={true} animationInDelay={300 * index}>
                        <CSSTransition key={index} timeout={500} classNames="fade">
                            <Card fluid key={index} style={cardStyle} >
                                <Image src={event.img} />
                                <Card.Content>
                                    <Card.Header>{event.title}</Card.Header>
                                    <Card.Meta>
                                        <span>{event.city}</span>
                                    </Card.Meta>
                                    <Card className="Description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident, facilis! Delectus maiores, deserunt asperiores voluptatem, cumque officia aliquid fugiat, sapiente assumenda facilis nam ex similique tempora fuga veritatis non omnis quam? Architecto officia quae eos ea sed fuga voluptatibus eum?</Card>
                                </Card.Content>
                                <Card.Content extra index={index}>
                                    <Button as='div' index={index} labelPosition='right' onClick={this.props.countLikes} >
                                        <Button icon >
                                            <Icon name='heart' index={index} />
                                            Like
                                         </Button>
                                        <Label as='a' basic pointing='left'>
                                            {event.liked}
                                        </Label>
                                    </Button>


                                    <Link to={'/event/' + event.id + '/' + clean(event.title)}><button>show detail</button></Link>
                                </Card.Content>
                            </Card>
                        </CSSTransition>
                        // </Animated>
                    ))}
                </TransitionGroup >

            </div>
        );
    }


}
export default EventList;

