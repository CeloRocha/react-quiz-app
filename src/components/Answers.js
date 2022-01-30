export default function Answers (props) {
    const selected = props.selected
    const finished = props.finished
    const status = props.isCorrect

    let extraClasses = ''
    if(!finished && selected){
        extraClasses = 'selected'
    }else if(finished){
        if(selected && !status){
            extraClasses = 'wrong'
        }
        if(status){
            extraClasses = 'correct'
        }
        if(!selected && !status){
            extraClasses = 'checking'
        }
    }

    return(
        <button onClick={(event)=>props.select(props.id)} type='button' className={`answer ${extraClasses}`} dangerouslySetInnerHTML={{__html: props.answer}}></button>
    )
}