import TypedText from "./TypedText"
import { useSelector, useDispatch } from 'react-redux'
import { setMemory } from "../stores/brainSlice"
import { H2 } from "./ThemedStyles"

// Data Layout:
// { 
//   "text": "> STATION MAP", 
//   "type": "links", 
//   "target": "map" 
//   "values": ["securityLevel"],
//   "equals": ["admin"]
// }

// Brain Example 
// {
//   brain: {
//     memory: {
//       page: 1,
//       username: 'gandalf',
//       password: '3aglesFtw7'
//       securityLevel: 'employee'
//     },
//     config: {
//       preloadMemory: {
//         users: [
//           {
//             username: 'admin',
//             password: 'admin',
//             securityLevel: 'admin'
//           },
//           {
//             username: 'gandalf',
//             password: '3aglesFtw7',
//             securityLevel: 'employee'
//           },
//           {
//             username: 'frodo',
//             password: 'pr3cious',
//             securityLevel: 'guest'
//           }
//         ]
//       }
//     }
//   }
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

  const { against, values, equals } = options

  const determination = values.map((val, index) => {
    return memory[val] == equals[index]
  }).filter((val) => !!val).length == values.length

  const setPageTo = {page: pages.findIndex((page) => (page.id == options.target) )}
  console.log(setPageTo)
  console.log(determination)
  if(determination){
    return (
      <H2 {...theme} onClick={() => {dispatch(setMemory(setPageTo))}}>
        <TypedText doneCallback={doneCallback} text={interpolateNamedValues(options.text, memory)}/>
      </H2>
    )
  } else {
    return null
  }
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