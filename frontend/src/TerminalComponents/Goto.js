import { useSelector, useDispatch } from 'react-redux'
import { setMemory } from "../stores/brainSlice"
import { useState } from 'react'

export default ({doneCallback, options}) => {
  const [pages, memory] = useSelector((state) => [state.brain.pages, state.brain.memory])
  const dispatch = useDispatch()
  const [repeat, setRepeat] = useState(options.repeat || 0)
  
  const page = pages.findIndex((page) => (page.id == options.target))
  const setPageTo = {page: page}
  
  // if(!(page == memory.page && cue == memory.cue) || repeat >=0 ) {
    // setRepeat(repeat - 1)
  dispatch(setMemory(setPageTo))
  // } else {
  //   doneCallback()
  // }
}