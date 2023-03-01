import { useEffect, useState } from 'react';

const useWindowSize = () => {
      const [screenSize, getDimension] = useState({
            width: 782,
            height: 0
      })

      const setDimension = () => {
            getDimension({
                  width: window.innerWidth,
                  height: window.innerHeight
            })
      }

      useEffect(() => {
            if (screenSize.width === 782) {
                  getDimension({
                        width: window.innerWidth,
                        height: window.innerHeight
                  })
            }
            window.addEventListener("resize", setDimension);
            return () => {
                  window.addEventListener("resize", setDimension)
            }
      }, [screenSize])

      return screenSize
}

export default useWindowSize;