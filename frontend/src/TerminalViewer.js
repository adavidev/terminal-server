import logo from './logo.svg';
import './App.scss';

import React, { useState, useEffect } from 'react'
import TextBlock from './TerminalComponents/TextBlock'
import InputField from './TerminalComponents/InputField'
import { setMemory } from './stores/brainSlice'
import { useSelector } from 'react-redux'
import Links from './TerminalComponents/Links'
import ScrollableDiv from './Components/ScrollableDiv'

const fromConfig = (pages) => {
  const typeDictionary = {
    screen: [
      {
        determine: (val) => (typeof val == 'string'),
        resolve: (text) => (({doneCallback}) => {
          return (<TextBlock doneCallback={doneCallback} options={text}/>)
        })
      },
      {
        determine: (val) => (val.type == 'input'),
        resolve: (opts) => (({doneCallback}) => {
          return (<InputField doneCallback={doneCallback} options={opts}/>)
        })
      },
      {
        determine: (val) => (val.type == 'links'),
        resolve: (opts) => (({doneCallback}) => {
          return (<Links options={opts}/>)
        })
      }
    ]
  }

  return pages.map((page) => {
      return page.content.map((contentItem) => {
        let item = typeDictionary[page.type].find(obj => obj.determine(contentItem))?.resolve(contentItem)
        return item
      }
    )
  })
}

function TerminalViewer() {
  const [renderIndex, setRenderIndex] = useState(1)
  const [renderedItems, setRenderedItems] = useState([])
  const memory = useSelector((state) => state.brain.memory)
  const pages = fromConfig(memory.pages)

  useEffect(() => {
    const readyToRenderItems = pages[memory.page]
    setRenderIndex(1)

    setRenderedItems(
      readyToRenderItems
        .map((component) => {
          if (component) {
            return React.createElement(component, {
              doneCallback: (newMemory) => {
                setMemory(newMemory)
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
  }, [memory.page])

  useEffect(() => console.log(memory), [memory])

  return (
    <div className="scanlines">
      <div className="screen-cone"></div>
      <ScanLineSvg />
     
      <ScrollableDiv>
        <header className="Terminal-Viewer">
          {renderedItems.slice(0, Math.min(renderIndex, renderedItems.length)).map((component) => component)}
        </header>
      </ScrollableDiv>
    </div>
  );
}

export default TerminalViewer;


const ScanLineSvg = () => (
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
)