import { useEffect } from "react"
import { H2 } from "../ThemedStyles"
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

  const newTheme = {...theme, color: theme.backgroundColor}

  useEffect(() => {
    doneCallback()
  },[])
  
  return (
  <H2 {...newTheme}>
    <span>{interpolateNamedValues(options, memory)}</span>
  </H2>
)
}