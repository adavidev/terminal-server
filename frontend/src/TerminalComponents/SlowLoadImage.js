
import React, { useEffect, useRef, useState } from 'react';
import './imageLoader.scss'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default (
  {
    doneCallback, 
    options
  }) => {
    const defaults = {
      src: '', 
      resolution: 100, 
      grayscale: false,
      width: null,
      height: null,
    }
  const {src, resolution, grayscale, width, height} = {...defaults, ...options}
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false)
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if(ready) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = Math.min(prevCounter + prevCounter, resolution);
          if (newCounter >= resolution) {
            doneCallback()
            clearInterval(interval);
          }
          return newCounter;
        });
      }, 200 + getRandomInt(500) )

      return () => {
        clearInterval(interval);
      }
    }
  }, [ready]);

  useEffect(() => {
    if(ready) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const image = new Image();

      // turn off image smoothing - this will give the pixelated effect
      context.mozImageSmoothingEnabled = false
      context.webkitImageSmoothingEnabled = false
      context.imageSmoothingEnabled = false

      image.src = src;
      
      image.onload = () => {
        // Set canvas size based on image dimensions
        var size = (counter) * 0.01,
          // cache scaled width and height
          w = canvas.width * size,
          h = canvas.height * size

        if (grayscale) {
          context.filter = 'grayscale(100%)';
        }

        // Draw the image on the canvas
        context.drawImage(image, 0, 0, w, h)
        context.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height)
      }
    }
  }, [ready, counter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = new Image()
    img.src = src;
    img.onload = () => {
      const w = width || img.width
      const h = height || img.height
      canvas.width = w;
      canvas.height = h;
      setReady(true)
    }
  }, [])

  return <canvas className="loading" ref={canvasRef} width={width} height={height} />;
}