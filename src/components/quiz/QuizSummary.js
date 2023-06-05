import React, {Component} from 'react'

class QuizSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestion: 0,
            numberOfAnsweredQuestion: 0,
            correctAnswer: 0,
            wrongAnswer: 0
        }
    }
    render() {
        console.log(this.props.data)
        return(
            <h1>Hello from Quiz Summary</h1>
        )
    }
}

export default QuizSummary;
