import Question from "../components/Question";
import '../styles/quizPage.css'
import {useState, useEffect} from 'react'

export default function QuizPage (props) {
    const [finishQuiz, setFinishQuiz] = useState(false)
    const [correctHits, setCorrectHits] = useState([-1, -1, -1, -1, -1])
    const [result, setResult] = useState(0)
    const [searchHere, serSearchHere] = useState(props.loading)

    function sumHits (idQuestion, idAnswer) {
        setCorrectHits(prevCorrectHits => {
            const newCorrectHits = [...prevCorrectHits]
            newCorrectHits[idQuestion] = idAnswer
            return newCorrectHits
        })
    }

    function handleFinish(){
        if(!correctHits.some(number => number<0)){
            if(!finishQuiz){
                setFinishQuiz(true)
            }else{
                props.changePage()
            }
        }
    }

    useEffect(()=>{
        setResult(correctHits.reduce((total, number)=>{
            if(number === 3) return total+1
            return total
        }, 0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [finishQuiz])

    function restart () {
        props.tryAgain()
        setCorrectHits([-1, -1, -1, -1, -1])
        setFinishQuiz()
        setResult(0)
    }

    const questions = props.questions.map((question, index) =>{
        return(
            <Question
                key={question.question}
                id={index}
                correctAnswer={question.correct_answer}
                incorrectAnswers={question.incorrect_answers}
                title={question.question}
                selected={correctHits[index]}
                state={finishQuiz}
                sumHits={sumHits}
            />
        )
    })

    return(
        <div className='quizPage'>
                {questions}
                {finishQuiz && <h2 className='quiz-result'>You hit {result}/5 points</h2>}
                <button className='button-blue quiz-button' onClick={handleFinish}>{finishQuiz ? 'Go Back' : 'Check Answers'}</button>
                {finishQuiz && <button className={`button-blue quiz-button ${props.loading && 'loading'}`} onClick={restart}>Try again</button>}
        </div>

    )
}