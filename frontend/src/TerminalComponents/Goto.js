import { useSelector, useDispatch } from 'react-redux'
import { setMemory } from "../stores/brainSlice"
import { useState } from 'react'

export default ({doneCallback, options}) => {
  const [pages, cues, memory] = useSelector((state) => [state.brain.pages, state.brain.cues, state.brain.memory])
  const dispatch = useDispatch()
  const [repeat, setRepeat] = useState(options.repeat || 0)
  const findCue = (list, name) => {
    if (list.length === 0) {
      return -1; // Return -1 or any other value that indicates the name was not found
    }
  
    const indexItem = list.find(item => item.id === name);

    return indexItem.index;
  };
  
  const page = pages.findIndex((page) => (page.id == options.target))
  const cue = findCue(cues, options.name)
  const setPageTo = {page: page, cue: cue, triggerAction: !memory.triggerAction}
  
  // if(!(page == memory.page && cue == memory.cue) || repeat >=0 ) {
    // setRepeat(repeat - 1)
    dispatch(setMemory(setPageTo))
  // } else {
  //   doneCallback()
  // }
}