import StartPage from "./pages/StartPage";
import QuizPage from "./pages/QuizPage";
import './styles/app.css'

import {useState, useEffect} from 'react'

function App () {

    const [page, setPage] = useState(false);
    const [questions, setQuestions] = useState('')
    const [search, setSearch] = useState(false)
    const [category, setCategory] = useState(9)
    const [questionType, setQuestionType] = useState([{id: 9, name: 'General Knowledge'}])

    useEffect(()=>{
        fetch('https://opentdb.com/api_category.php')
        .then(res=>res.json())
        .then(res=>{
            setQuestionType(res.trivia_categories)
        })
    }, [])

    useEffect(()=>{
        if(search){
            fetch(`https://opentdb.com/api.php?amount=5&category=${category}&type=multiple`)
            .then(res => res.json())
            .then(res => setQuestions(res.results))
            .then(()=>{
                setPage(true)
                setSearch(false)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    function changeCategory(event){
        console.log(event.target.value)
        setCategory(event.target.value)
    }

    function changePage () {
        setPage(prevPage => !prevPage)
    }
    function searchQuestions () {
        setSearch(true)
    }


    return(
        <div className='container'>
            <div className='background'></div>
            <main>
                {!page && <StartPage handleStart={searchQuestions} loading={search} questionType={questionType} changeCategory={changeCategory}/>}
                {page && !search && <QuizPage questions={questions} changePage={changePage} tryAgain={searchQuestions} loading={search}/>}
                {page && search && <div className='loadingDiv'></div>}
            </main>
        </div>
    )
}

export default App