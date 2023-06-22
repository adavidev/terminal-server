import { AlertText } from "./ThemedStyles"
import TypedText from "./TypedText"
import { useSelector, useDispatch } from 'react-redux'

export default ({doneCallback, options}) => {
  const memory = useSelector((state) => state.brain.memory)
  const [theme] = useSelector((state) => [state.theme])

  const interpolateNamedValues = (templateValues, namedValues) => {
    let interpolatedValue = templateValues;
    for (const [key, value] of Object.entries(namedValues)) {
      interpolatedValue = interpolatedValue.replace(`{${key}}`, value);
    }
    return interpolatedValue;
  }
  
  return (
  <AlertText {...theme}>
    <TypedText doneCallback={doneCallback} text={interpolateNamedValues(options.text, memory)}/>
  </AlertText>
)
}