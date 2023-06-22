import { useState, useEffect } from "react"

const Cursor = ({disabled = false}) => {
  // var cursor = true;
  const speed = 400;

  const [style, setStyle] = useState({visibility: 'inherit'})
  const [cursor, setcursor] = useState(true)

  useEffect(() => {
    let timeout = null
    if(!disabled) {
      timeout = setTimeout(() => {
        setStyle({visibility: cursor ? 'inherit' : 'hidden'})
        setcursor(disabled ? false : !cursor);
      }, speed);
  
    }
    return () => clearTimeout(timeout);
  }, [cursor, disabled]);

  useEffect(() => {
    setcursor(false);
    setStyle({visibility: 'hidden'})

  }, [disabled])

  return (
    <span style={style} id="cursor">|</span>
  )
}

export default Cursor