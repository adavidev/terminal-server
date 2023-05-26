import TypedText from "../TypedText"
import { useSelector, useDispatch } from 'react-redux'
import { setMemory } from "../stores/brainSlice"

export default ({doneCallback, options}) => {
  const memory = useSelector((state) => state.brain.memory)
  const dispatch = useDispatch()

  const interpolateNamedValues = (templateValues, namedValues) => {
    let interpolatedValue = templateValues;
    for (const [key, value] of Object.entries(namedValues)) {
      interpolatedValue = interpolatedValue.replace(`{${key}}`, value);
    }
    return interpolatedValue;
  }

  const setPageTo = {page: memory.pages.findIndex((page) => (page.id == options.target) )}
  console.log(setPageTo)
  
  return (
    <h2 onClick={() => {dispatch(setMemory(setPageTo))}}>
      <TypedText doneCallback={doneCallback} text={interpolateNamedValues(options.text, memory)}/>
    </h2>
  )
}