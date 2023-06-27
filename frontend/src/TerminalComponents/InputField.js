import { useDispatch, useSelector } from "react-redux"
import LineInput from "./LineInput"
import TypedText from "./TypedText"
import { setMemory } from "../stores/brainSlice"
import { H2 } from "./ThemedStyles"

export default ({doneCallback, options}) => {
  const {memoryName, prompt = '>', rules} = options
  const [theme] = useSelector((state) => [state.theme])
  const dispatch = useDispatch()

  const callback = (value) => {
    doneCallback({[memoryName]: value})
  }

  return (
    <H2 {...theme}>
      <TypedText text={prompt}/><LineInput  doneCallback={callback}/>
    </H2>
  )
}