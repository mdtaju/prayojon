import { Skeleton } from '@mui/material'
import React, { useState } from 'react'

function ImageLoader({ children }) {
      const [loaded, setLoaded] = useState(false)
      return (
            <div className="relative">
                  {/* <Image src="____" 
                    fill 
                    className={`${(!loaded) ? 'opacity-0' : 'opacity-100'}}`} 
                    onLoadingComplete={()=>setLoaded(true)}
                /> */}
                  {!loaded && (
                        <Skeleton
                              sx={{ bgcolor: 'grey.100' }}
                              variant="rectangular"
                              width="100%"
                              height="100%"
                        />
                  )}
            </div>)
}

export default ImageLoader