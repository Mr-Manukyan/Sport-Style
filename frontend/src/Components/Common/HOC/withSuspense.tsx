import React from 'react'
import { LoadingPage } from '../LoadingPage/LoadingPage'

export const withSuspense  = (Component : React.ComponentType) => {
  return (props:any) => {
    return (
      <React.Suspense fallback={<LoadingPage/>}>
        <Component {...props}/>
      </React.Suspense>
    )
  }
}