import React, {Component, Fragment} from 'react'
import questions from '../questions.json'
import isEmpty from "../utils/is-empty";
import M from 'materialize-css';
import { useDispatch } from 'react-redux';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswer: 0,
            wrongAnswer: 0,
            time: {}
        };
        
    }

    componentDidMount() {
        const {questions, currentQuestion, nextQuestion} = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion)
    }

    displayQuestions = (questions = this.state.question, currentQuestion, nextQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                numberOfQuestions: questions.length,
                answer
            })
        }
    }

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    }

    correctAnswer = () => {
        M.toast({
            html: 'Correct Answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score + 1,
            correctAnswer: prevState.correctAnswer + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestion + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame()
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion)
            }
        })
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong Answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        this.setState(prevState => ({
            score: prevState.score,
            wrongAnswer: prevState.wrongAnswer + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestion
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            }
            else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion)
            }
        })
    }

    handleNextButtonClick = () => {
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion)
            })
        }
    }

    handleQuitButtonClick = () => {
        if (window.confirm('Are you sure you want to quit?')) {
            this.props.navigate("/")
        }
    }

    endGame = () => {
        alert("Quiz has ended!")
        const {state} = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestion: state.numberOfAnsweredQuestions,
            correctAnswer: state.correctAnswer,
            wrongAnswer: state.wrongAnswer
        }
        this.props.setData(playerStats)
        this.props.navigate("/quizsummary")
    }

    render() {
        const {currentQuestion, currentQuestionIndex, numberOfQuestions} = this.state;
        return (
            <Fragment>
                <div className="question">
                    <h1>Quizz Page</h1>
                    <div><p><span>Question {currentQuestionIndex + 1}/{numberOfQuestions}</span></p></div>
                    <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                    </div>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                    </div>
                    <div className="button-container">
                        <button onClick={this.handleNextButtonClick} className="next">Next</button>
                        <button onClick={() => this.handleQuitButtonClick()} className="quit">Quit</button>
                    </div>
                </div>

            </Fragment>
        )
    }
}
export default Play;