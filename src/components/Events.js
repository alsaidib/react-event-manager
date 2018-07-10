import React from 'react'
import EventsSlider from './EvenstSlider';
import EventList from './EventList';
import Maps from "./Maps"
import { Grid, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


const Events = (props) => (
    <div>
        <Grid columns={2} divided stretched>
            <Grid.Row>
                <Grid.Column>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <EventsSlider theMostLikedEvents={props.theMostLikedEvents} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Maps events={props.events} getCoordinates={props.getCoordinates} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <EventList events={props.events} countLikes={props.countLikes} />
                    </Segment>
                </Grid.Column>
            </Grid.Row>

        </Grid>
    </div >
)

export default Events