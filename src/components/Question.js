import Answers from "./Answers";
import {useState, useEffect} from 'react'

export default function Question (props) {

    const [answers, setAnswers] = useState(initializeAnswers)

    function initializeAnswers () {
        const incorrects = props.incorrectAnswers.map((answer, index) =>{
            return(
                {
                    key: answer,
                    answer: answer,
                    isCorrect: false,
                    id: index,
                    selected: false
                }
            )
        })
        const correct = {
            key: props.correctAnswer,
            answer: props.correctAnswer,
            isCorrect: true,
            id: 3,
            selected: false
        }

        const randomNumber = Math.floor(Math.random()*4)
        let answersArray = []
        for(let i=0; i<4; i++){
            if(i === randomNumber){
                answersArray.push(correct)
            }else{
                answersArray.push(incorrects.shift())
            }
        }
        return answersArray
    }

    function handleClick(id){
       setAnswers(prevAnswers=>{
            return prevAnswers.map(answer=>{
                return(id === answer.id ? {...answer, selected: true} : {...answer, selected: false})
            })
        })
        props.sumHits(props.id, id)
    }

    const answersArray = answers.map(answerData =>{
        return <Answers key={answerData.key} answer={answerData.answer} isCorrect={answerData.isCorrect} id={answerData.id} selected={answerData.selected} select={handleClick} finished={props.state}/>
    })

    return(
        <div className='question'>
            <h2 className='question-title' dangerouslySetInnerHTML={{__html: props.title}}></h2>
            <section className='question-answers'>
                {answersArray}
            </section>
            <hr></hr>
        </div>
    )
}