import TypedText from "../TypedText"
import { useSelector, useDispatch } from 'react-redux'

export default ({doneCallback, options}) => {
  const memory = useSelector((state) => state.brain.memory)

  const interpolateNamedValues = (templateValues, namedValues) => {
    let interpolatedValue = templateValues;
    for (const [key, value] of Object.entries(namedValues)) {
      interpolatedValue = interpolatedValue.replace(`{${key}}`, value);
    }
    return interpolatedValue;
  }
  
  return (
  <h2>
    <TypedText doneCallback={doneCallback} text={interpolateNamedValues(options, memory)}/>
  </h2>
)
}