import TypedText from "./TypedText"
import { useSelector, useDispatch } from 'react-redux'
import { setMemory } from "../stores/brainSlice"
import { H2 } from "./ThemedStyles"
import { useEffect, useState } from "react"

// Data Layout:
// {
//   "type": "toggle",
//   "memoryName": "shower4Status",
//   "text": "> SHOWER 4 ::",
//   "states": [
//     "OFF",
//     "ON"
//   ]
// }

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

  const { states, memoryName, text } = options
  const [state, setState] = useState(memory[memoryName] == undefined ? true : false)
  const [showOption, setShowOption] = useState(false)


  const changeStates = () => {
    dispatch(setMemory({[memoryName]: !state}))
    // setState(!state)
  }

  useEffect(() => {
    setState(memory[memoryName])
  }, [memory[memoryName]])

  return (
    <H2 {...theme} onClick={changeStates}>
      <TypedText doneCallback={() => setShowOption(true)} text={interpolateNamedValues(text, memory)}/>
      {showOption && <TypedText doneCallback={doneCallback} text={interpolateNamedValues(states[state ? 1 : 0], memory)}/>}
    </H2>
  )
}

// const [pages, memory, config] = useSelector((state) => [state.brain.pages, state.brain.memory, state.brain.config])
//   const dispatch = useDispatch()
  
//   const passPage = pages.findIndex((page) => (page.id == options.passCue))
//   const failPage = pages.findIndex((page) => (page.id == options.failCue))
  
//   const { against, values, memoryName } = options

//   const determination = config.preloadMemory[against].find((preLoad) => {
//     const matches =  values.filter((value) => {
//       return memory[value] == preLoad[value]
//     })
//     return matches.length == values.length
//   })

//   if (determination != undefined) {
//     const newMemory = {}
//     newMemory[memoryName] = determination[memoryName]
//     if(passPage == memory.page){
//       doneCallback(memoryName)
//     } else {
//       dispatch(setMemory({page: passPage, ...newMemory}))
//     }
//   } else {
//     dispatch(setMemory({page: failPage}))
//   }