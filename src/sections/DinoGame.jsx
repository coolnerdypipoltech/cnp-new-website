import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Unity, useUnityContext } from 'react-unity-webgl'

export default function DinoGame() {
  const navigate = useNavigate()
  const { unityProvider, isLoaded, loadingProgression, sendMessage } = useUnityContext({
    loaderUrl: '/Build/Build.loader.js',
    dataUrl: '/Build/Build.data',
    frameworkUrl: '/Build/Build.framework.js',
    codeUrl: '/Build/Build.wasm',
  })

  const audioContextRef = useRef<(AudioContext) | null>(null)
  const analyserRef = useRef<(AnalyserNode) | null>(null)
  const micStreamRef = useRef<(MediaStream) | null>(null)
  const unityReadyRef = useRef(false)
  
  const JUMP_THRESHOLD = 30

  useEffect(() => { 
    if (isLoaded && !unityReadyRef.current) {
      setTimeout(() => {
        unityReadyRef.current = true
        setupMicrophone()
            if(window.screen.width < 500 ){
          sendMessage("GameManager", "isMobile")
        } else{
          
          if(window.screen.width < 1000){
          sendMessage("GameManager", "isTablet")
        }else{
          sendMessage("GameManager", "isPc")
        }
    }
      }, 1000)
    }
  }, [isLoaded])

  useEffect(() => {


    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (audioContextRef.current) {
        //audioContextRef.current.close()
      }
    }
  }, [])

  const howToPlay = () => {
    sendMessage("GameManager", "PauseGame")
    if(window.screen.width < 800){
          sendMessage("GameManager", "isMobile")
        } else{
          sendMessage("GameManager", "isPc")
        }
  }

  const setupMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      micStreamRef.current = stream

      let audioContext = audioContextRef.current

      if (audioContext === null) {
        audioContext = new AudioContext()
        audioContextRef.current = audioContext
      }

      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 64
      analyserRef.current = analyser

      const source = audioContext.createMediaStreamSource(stream)
      source.connect(analyser)

      monitorNoise()
    } catch (error) {
    }
  }

  const monitorNoise = () => {
    if (!analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)

    const checkNoise = () => {
      if (!analyserRef.current) return

      analyserRef.current.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length

      if (average > JUMP_THRESHOLD) {
        jump(average)
      }

      requestAnimationFrame(checkNoise)
    }

    checkNoise()
  }


  const jump = (average) => {

    if (!isLoaded || !unityReadyRef.current) {
      return
    }

    console.log(" Jump!")
    sendMessage("Player", "SetJumpTriggerForce", average)
  }

  return <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        position: 'relative',
      }}>

  
        {/* Indicador de carga */}
        {!isLoaded && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '18px',
            textAlign: 'center',fontFamily: "Golden Age",
            zIndex: 999,
          }}>
            <div>Loading...</div>
            <div style={{ marginTop: '10px', fontSize: '24px' }}>
              {Math.round(loadingProgression * 100)}%
            </div>
          </div>
        )}
  
        {/* Unity Game Canvas */}
        <Unity 
          unityProvider={unityProvider} 
          style={{ 
            width: "100%", 
            height: "100%",
            maxWidth: "1920px",
            maxHeight: "1080px",
            visibility: isLoaded ? 'visible' : 'hidden',
          }} 
        />
      </div>
}
