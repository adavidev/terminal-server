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
        determine: (val) => (val.type == 'cue'),
        resolve: (opts, index) => {
          if(index) dispatch(addCues({type: opts.type, id: opts.id, index: index}))
          return ({doneCallback}) => {
          return doneCallback()
        }}
      }
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
      setRenderIndex(Math.max(1, memory.cue))
      console.log(renderIndex)

      setRenderedItems(
        readyToRenderItems
          .map((component) => {
            if (component) {
              return React.createElement(component, {
                doneCallback: (newMemory) => {
                  if(newMemory) setMemory(newMemory)
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
  }, [memory.triggerAction, renderables])

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
          {renderedItems.slice(Math.max(0, memory.cue), Math.min(renderIndex, renderedItems.length)).map((component) => component)}
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