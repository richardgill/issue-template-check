import * as React from 'react'

type Context = {
  fontsLoaded: boolean
  animated: boolean
  setAnimated: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppContext = React.createContext<Context | undefined>(undefined)

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false)
  const [animated, setAnimated] = React.useState(false)

  React.useEffect(() => {
    try {
      document.fonts.ready
        .then(() => {
          setFontsLoaded(true)
        })
        .catch((error: unknown) => {
          console.error(error)
          setFontsLoaded(true)
        })
    } catch (error) {
      console.error(error)
      setFontsLoaded(true)
    }
  }, [])

  return (
    <AppContext.Provider value={{ fontsLoaded, animated, setAnimated }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}
