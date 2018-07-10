import React, { Component } from "react"
import { TransitionGroup, CSSTransition } from 'react-transition-group'



const todoAnimation = {
    appear: "animated",
    appearActive: "fadeIn",
    enter: "animated",
    enterActive: "bounceInDown",
    exit: "animated",
    exitActive: "slideOutRight"
};




export default class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {
                    id: 11111,
                    todo: "swim"
                },
                {
                    id: 2222,
                    todo: "play"
                },
                {
                    id: 3333,
                    todo: "watch movie"
                },
                {
                    id: 44444,
                    todo: "have fun"
                },
                {
                    id: 5555,
                    todo: "relax"
                }
            ],
            toAdd: ""
        }
    }

    changeTodo = (e) => {
        this.setState({ toAdd: e.target.value })
    }

    AddTodo = (e) => {
        e.preventDefault();
        this.setState({
            todos: [...this.state.todos, { id: Date.now(), todo: this.state.toAdd }],
            toAdd: ""
        })
    }

    remove = (e) => {
        e.preventDefault();
        this.setState({
            todos: this.state.todos.filter((el) => {
                return el.id !== parseInt(e.target.parentElement.getAttribute('index'), 10)
            })
        })
    }


    componentDidMount() {
        console.log("did mount from todolist")
        ////////////// requset data from api/////


    }





    render() {
        const elements = this.state.todos.map((el, index) => {
            return (
                //iterate throw the state to pass all todos that i have
                <CSSTransition key={el.id} timeout={900} classNames={todoAnimation}>
                    <div index={el.id}>  {el.todo}  <a href="" onClick={this.remove}>delete</a>    </div>
                </CSSTransition>
            )
        })

        return (
            //show the state + input to add new todo
            <div>
                <div>
                    <TransitionGroup appear={true}>
                        {elements}
                    </TransitionGroup>
                </div>
                <form onSubmit={this.AddTodo}>
                    <input type="text"
                        onChange={this.changeTodo}
                        value={this.state.toAdd} />
                </form>

            </div>
        )
    }
}



/////to change both of the value from the input element and also from the state itself i need to add the value inside the inpujt element {this.state.addTodo}
// and also make a function to change the value of the state from the input