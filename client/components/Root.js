import * as React from "react"
import { useEffect, useState } from "react"
import useAuth from "./Hooks/useAuth"
import AuthenticatedApp from "./AuthApps/AuthenticatedApp"
import UnauthenticatedApp from "./AuthApps/UnauthenticatedApp"

const Root = () => {
  const [user] = useAuth()
  const [loaded, setLoad] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    if (user) {
      setLoad(true)
    }
  })

  const calculateWindowHeight = () => {
    setWindowHeight(window.innerHeight * 0.01)
  }

  useEffect(() => {
    const vh = window.innerHeight * 0.01
    setWindowHeight(vh)
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty("--vh", `${windowHeight}px`)
    window.addEventListener("resize", calculateWindowHeight)
    return () => {
      window.removeEventListener("resize", calculateWindowHeight)
    }
  }, [windowHeight])

  return !loaded ? (
    <div>Loading...</div>
  ) : user.id ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  )
}

export default Root
