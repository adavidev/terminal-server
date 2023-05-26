import { useDispatch } from "react-redux"
import LineInput from "../LineInput"
import TypedText from "../TypedText"
import { setMemory } from "../stores/brainSlice"

export default ({doneCallback, options}) => {
  const {memoryName, prompt = '>', rules} = options
  const dispatch = useDispatch()

  const callback = (value) => {
    dispatch(setMemory({[memoryName]: value}))
    doneCallback({[memoryName]: value})
  }

  return (
    <h2>
      <TypedText text={prompt}/><LineInput  doneCallback={callback}/>
    </h2>
  )
}