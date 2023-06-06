import TypedText from "../TypedText"
import { useSelector, useDispatch } from 'react-redux'
import { setMemory } from "../stores/brainSlice"
import { H2 } from "../ThemedStyles"

export default ({doneCallback, options}) => {
  const [pages, memory] = useSelector((state) => [state.brain.pages, state.brain.memory])
  const [theme] = useSelector((state) => [state.theme])
  const dispatch = useDispatch()

  const interpolateNamedValues = (templateValues, namedValues) => {
    let interpolatedValue = templateValues;
    for (const [key, value] of Object.entries(namedValues)) {
      interpolatedValue = interpolatedValue.replace(`{${key}}`, value);
    }
    return interpolatedValue;
  }

  const setPageTo = {page: pages.findIndex((page) => (page.id == options.target) )}
  console.log(setPageTo)
  
  return (
    <H2 {...theme} onClick={() => {dispatch(setMemory(setPageTo))}}>
      <TypedText doneCallback={doneCallback} text={interpolateNamedValues(options.text, memory)}/>
    </H2>
  )
}