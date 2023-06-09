import './TerminalStyles.scss';

import React, { useState, useEffect } from 'react'
import TextBlock from './TerminalComponents/TextBlock'
import InputField from './TerminalComponents/InputField'
import { setMemory, fetchPages, addCues } from './stores/brainSlice'
import { setColor, setBackgroundColor, setFont } from './stores/themeSlice'
import { useSelector } from 'react-redux'
import Links from './TerminalComponents/Links'
import ScrollableDiv from './Components/ScrollableDiv'
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import axios from 'axios'
import { memo } from 'react'
import SlowLoadImage from './TerminalComponents/SlowLoadImage'
import { StyledTerminal } from './TerminalComponents/ThemedStyles'
import AlertText from './TerminalComponents/AlertText'
import Goto from './TerminalComponents/Goto'
import GoIf from './TerminalComponents/GoIf'
import Splash from './TerminalComponents/Splash'
import LinkIf from './TerminalComponents/LinkIf'
import Toggle from './TerminalComponents/Toggle'
import Dialog from './TerminalComponents/Dialog'
import DTextBlock from './TerminalComponents/DialogComponents/DTextBlock'

const fromConfig = (pages, dispatch) => {
  console.log(pages)
  const typeDictionary = {
    screen: [
      {
        determine: (val) => (typeof val == 'string'),
        resolve: (text) => (({doneCallback}) => {
          return (<TextBlock doneCallback={doneCallback} options={text}/>)
        })
      },
      {
        determine: (val) => (val.type == 'inline-alert'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<AlertText doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'input'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<InputField doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'links'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<Links doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'linkif'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<LinkIf doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'image'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<SlowLoadImage doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'goto'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<Goto doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'goif'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<GoIf doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'splash'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<Splash doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'toggle'),
        resolve: (opts, index) => (({doneCallback}) => {
          return (<Toggle doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'dialog'),
        resolve: (opts, index) => (({doneCallback}) => {
          useEffect(() => {
            dispatch(setMemory({dialog: opts.target}))
            doneCallback()
          }, [])
          return null
        })
      }
    ],
    dialog: [
      {
        determine: (val) => (typeof val == 'string'),
        resolve: (text) => (({doneCallback}) => {
          return (<DTextBlock doneCallback={doneCallback} options={text}/>)
        })
      },
    ]
  }

  return pages.map((page) => {
      return page.content.map((contentItem, idx) => {
        let item = typeDictionary[page.type].find((obj) => obj.determine(contentItem))?.resolve(contentItem, idx)
        console.log(item)
        return item
      }
    )
  })
}

const DialogViewer = ({}) => {
  const [pages, memory, config, dialogs] = useSelector((state) => [state.brain.pages, state.brain.memory, state.brain.config, state.brain.dialogs])
  const [theme] = useSelector((state) => [state.theme])
  
  const [renderIndex, setRenderIndex] = useState(1)
  const [renderedItems, setRenderedItems] = useState([])
  const [renderables, setRenderables] = useState(null)
  const [jiggle, setJiggle] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!!dialogs) {
      let pageConfig = fromConfig(dialogs, dispatch)
      console.log(pageConfig)
      setRenderables(pageConfig)
    }
  }, [dialogs, jiggle, memory.dialog])

  useEffect(() => {
    console.log(renderables)
    console.log(dialogs && dialogs.find((di) => di.id == memory.dialog))
    if(renderables !== null && !!memory.dialog){
      const dialog = dialogs.map((di, idx) => ({...di, idx})).find((di) => di.id == memory.dialog).idx
      const readyToRenderItems = renderables[dialog]
      setRenderIndex(1)

      setRenderedItems(
        readyToRenderItems
          .map((component) => {
            if (component) {
              return React.createElement(component, {
                doneCallback: (newMemory) => {
                  if(newMemory) dispatch(setMemory(newMemory))
                  setRenderIndex(i => i + 1)
                },
              })
            } else {
              return null
            }
          })
          .filter(function (el) {
            return !!el
          })
      )
      console.log(renderedItems)

    } else {
      setJiggle(!jiggle)
    }
  }, [memory.dialog, renderables])

  return (
    !!memory.dialog && <Dialog close={() => {dispatch(setMemory({dialog: ''}))}}>{renderedItems.map((component) => component)}</Dialog>
  )
}

function TerminalViewer() {
  const [renderIndex, setRenderIndex] = useState(1)
  const [renderedItems, setRenderedItems] = useState([])
  const [renderables, setRenderables] = useState(null)
  const [jiggle, setJiggle] = useState(false)
  const [pages, memory, config] = useSelector((state) => [state.brain.pages, state.brain.memory, state.brain.config])
  const [theme] = useSelector((state) => [state.theme])
  const { name } = useParams();
  const dispatch = useDispatch()

  useEffect(async () => {
    console.log('Running: ', name)
    try {
      // Make a POST request to create the Terminal
      const response = await axios.get(`/api/links/${name}`);
  
      // Handle success, e.g., show a success message or perform any necessary actions
      console.log('Terminal:', response.data);
  
      // Reset the form after successful submission
      // state.pages = response.data
      dispatch(fetchPages(response.data))
  } catch (error) {
      // Handle error, e.g., display an error message or perform any necessary actions
      console.error('Error creating Terminal:', error);
    }
  }, [])

  useEffect(() => {
    if(pages !== null) {
      let pageConfig = fromConfig(pages, dispatch)
      console.log(pageConfig)
      setRenderables(pageConfig)
    }
  }, [pages, jiggle])

  useEffect(() => {
    console.log(renderables)
    if(renderables !== null){
      const readyToRenderItems = renderables[memory.page]
      setRenderIndex(1)

      setRenderedItems(
        readyToRenderItems
          .map((component) => {
            if (component) {
              return React.createElement(component, {
                doneCallback: (newMemory) => {
                  if(newMemory) dispatch(setMemory(newMemory))
                  setRenderIndex(i => i + 1)
                },
              })
            } else {
              return null
            }
          })
          .filter(function (el) {
            return !!el
          })
      )
      console.log(renderedItems)

    } else {
      setJiggle(!jiggle)
    }
  }, [memory.page, renderables])

  useEffect(() => {
    if(config && config.styles){
      dispatch(setColor(config.styles.color))
      dispatch(setBackgroundColor(config.styles.backgroundColor))
      dispatch(setFont(config.styles.font))
    }
  }, [config])

  return renderedItems.length ? (
    <StyledTerminal {...theme} className="scanlines terminal-app">
      <div className="screen-cone"></div>
      {/* <ScanLineSvg /> */}
      
      <ScrollableDiv>
        <header className="Terminal-Viewer">
          {renderedItems.slice(0, Math.min(renderIndex, renderedItems.length)).map((component) => component)}
          <DialogViewer />
        </header>
      </ScrollableDiv>
    </StyledTerminal>
  ) : null
}

export default TerminalViewer;


const ScanLineSvg = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
    <defs>
      <filter id="pixelate" x="0" y="0">
        <feFlood x="2" y="2" height="1" width="1"/> 
        <feComposite width="5" height="5"/>
        <feTile result="a"/>
        <feComposite in="SourceGraphic" in2="a" 
                    operator="in"/>
        <feMorphology operator="dilate"
                      radius="2.5"/>
      </filter>
    </defs>
  </svg>    
))