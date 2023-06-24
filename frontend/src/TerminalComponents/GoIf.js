import { useSelector, useDispatch } from 'react-redux'
import { setMemory } from "../stores/brainSlice"
import { useState } from 'react'

// Data Layout:
// {
//   "type": "goif",
//   "against": "users",
//   "values": ["username", "password"],
//   "passCue": "login",
//   "failCue": "retryLogin",
//   "memoryName": "securityLevel"
// },

// Brain Example 
// {
//   brain: {
//     memory: {
//       page: 1,
//       username: 'gandalf',
//       password: '3aglesFtw7'
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

// The GoIf component checks preloaded memory for a value named by "against", which it expects to be an array of objects
// it then searches those objects for one that matches the values of the same name as those stored in memory. In the example above, 
// the username and password will be successfully retreived, as gandalf and 3aglesFtw7 were set in memory by the same name.
// Then, it changes the page to either passCue or failCue, and if memoryName is not empty, 
// it will save the value of memoryName in the preloaded memory item into memory

export default ({doneCallback, options}) => {
  const [pages, memory, config] = useSelector((state) => [state.brain.pages, state.brain.memory, state.brain.config])
  const dispatch = useDispatch()
  
  const passPage = pages.findIndex((page) => (page.id == options.passCue))
  const failPage = pages.findIndex((page) => (page.id == options.failCue))
  
  const { against, values, memoryName } = options

  const determination = config.preloadMemory[against].find((preLoad) => {
    const matches =  values.filter((value) => {
      return memory[value] == preLoad[value]
    })
    return matches.length == values.length
  })

  if (determination != undefined) {
    const newMemory = {}
    newMemory[memoryName] = determination[memoryName]
    if(passPage == memory.page){
      doneCallback(memoryName)
    } else {
      dispatch(setMemory({page: passPage, ...newMemory}))
    }
  } else {
    dispatch(setMemory({page: failPage}))
  }
}