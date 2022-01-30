import '../styles/startPage.css'

export default function StartPage (props) {
    const options = props.questionType.map(type =>{
        return(
            <option value={type.id}>{type.name}</option>
        )
    })

    return(
        <section className='startPage'>
            <h1 className='title'>Quizzical</h1>
            <h2 className='description'>Some description here</h2>
            <button className={`button-blue button-start ${props.loading && 'loading'}`} onClick={props.handleStart}>Start quiz</button>
            <select className='selectCategory button-blue' onChange={props.changeCategory}>
                {options}
            </select>
        </section>
    )
}