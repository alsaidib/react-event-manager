import React, { Component } from "react";
import { Button, Form, Container } from 'semantic-ui-react';
import uuid from 'js-uuid';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import 'react-datepicker/dist/react-datepicker.css';

export default class AddEvents extends Component {
    constructor(props) {
        super();
        this.state = {
            inputs: {
                id: uuid.v4(),
                city: "",
                img: "",
                liked: 0,
                title: "",
                detail: "",
                startDate: moment(),
                location: ""
            }
        }

    }


    handleChange = (date) => {
        const copy = { ...this.state.inputs };
        copy.startDate = date
        this.setState({
            inputs: copy
        });
    }


    handleFormChange = e => {
        let inputsHolder = this.state.inputs;
        inputsHolder[e.target.name] = e.target.value;
        this.setState({

            inputs: inputsHolder
        })
    }


    handleLocation = () => {

        const coordinate = this.state.inputs.location.split(",")
        const LatLngObject = {
            lat: parseFloat(coordinate[0]),
            lng: parseFloat(coordinate[1])
        }
        return LatLngObject
    }
    handleFormSubmission = e => {
        //build the object with the eventinfo

        const newEvent = {
            id: uuid.v4(),
            city: this.state.inputs.city,
            img: this.state.imageURL,
            liked: 0,
            title: this.state.inputs.title,
            detail: this.state.inputs.detail,
            startDate: this.state.inputs.startDate.format("dddd, MMMM Do YYYY, h:mm:ss a"),//21664665
            location: this.handleLocation()
        }
        //pass that object to the function that was passed in my props 
        this.props.addEvent(newEvent)
        //update our form state to make everything empty/default



        this.setState({
            inputs: {
                id: uuid.v4(),
                city: "",
                img: "",
                liked: 0,
                title: "",
                detail: "",
                startDate: moment(),
                location: ""
            },
            image: '',
            isUploading: false,
            progress: 0,
            imageURL: ''
        })
    }




    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({ image: filename, progress: 100, isUploading: false });
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({ imageURL: url }));
        //console.log(this.state.avatarURL)

        //props.imgUrl(this.state.avatarURL)
    };


    render() {
        // console.log(this.props.imgUrl)
        return (
            <Container>
                <Form onSubmit={this.handleFormSubmission} >
                    <Form.Field >
                        <label>Event</label>
                        <input onChange={this.handleFormChange} value={this.state.inputs.title} name="title" placeholder='Event' />
                    </Form.Field>

                    <Form.Field >
                        <label>City</label>
                        <input onChange={this.handleFormChange} value={this.state.inputs.city} name="city" placeholder='City' />
                    </Form.Field>

                    <label>detail</label>
                    <Form.Field >
                        <input type="text" value={this.state.inputs.detail} name="detail" onChange={this.handleFormChange} placeholder='detail' />
                    </Form.Field>

                    <label>Date</label>
                    <DatePicker selected={this.state.inputs.startDate} onChange={this.handleChange} />


                    <label>location</label>
                    <Form.Field >
                        <input type="text" onChange={this.handleFormChange} value={this.state.inputs.location} name="location" placeholder='location' />
                    </Form.Field>
                    <Form.Field >
                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        {this.state.imageURL && <img alt="fck" src={this.state.imageURL} />}
                        <FileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref('images')}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    </Form.Field >
                    <Button type='submit'>Add event</Button>
                </Form>
            </Container>
        )
    }
}
