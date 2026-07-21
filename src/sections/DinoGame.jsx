import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Unity, useUnityContext } from "react-unity-webgl";
const PU = process.env.PUBLIC_URL;
export default function DinoGame() {
  const navigate = useNavigate();
  const [finishLoading, setFinishLoading] = useState(false);
  const { unityProvider, isLoaded, loadingProgression, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: `${PU}/Build/Build.loader.js`,
      dataUrl: `${PU}/Build/Build.data`,
      frameworkUrl: `${PU}/Build/Build.framework.js`,
      codeUrl: `${PU}/Build/Build.wasm`,
    });

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const unityReadyRef = useRef(false);

  const JUMP_THRESHOLD = 30;
  

  const handleGameOver = useCallback((userName, score) => {
    navigate('/')
  }, []);


  useEffect(() => {
    addEventListener("GameOver", handleGameOver);
    return () => {
      removeEventListener("GameOver", handleGameOver);
    };
  }, [addEventListener, removeEventListener, handleGameOver]);




  useEffect(() => {
    if (isLoaded && !unityReadyRef.current) {
      setTimeout(() => {
        unityReadyRef.current = true;
        setTimeout(() => {
          console.log(
            "Set finish loading --------------------------------------",
          );
          setFinishLoading(true);
        }, 1000);
        //setupMicrophone();
        checkTimeOfDay();
        if (window.screen.width < 500) {
          sendMessage("GameManager", "isMobile");
        } else {
          if (window.screen.width < 1000) {
            sendMessage("GameManager", "isTablet");
          } else {
            sendMessage("GameManager", "isPc");
          }
        }
      }, 1000);
    }
  }, [isLoaded]);

  useEffect(() => {
    return () => {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        //audioContextRef.current.close()
      }
    };
  }, []);

  const checkTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 19) {
      sendMessage("GameManager", "SetNight");
    } else {
      sendMessage("GameManager", "SetDay");
    }
  };


  const setupMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      let audioContext = audioContextRef.current;

      if (audioContext === null) {
        audioContext = new AudioContext();
        audioContextRef.current = audioContext;
      }

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      monitorNoise();
    } catch (error) {
      console.log("Error accessing microphone:", error);
    }
  };

  const monitorNoise = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const checkNoise = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

      if (average > JUMP_THRESHOLD) {
        jump(average);
      }

      requestAnimationFrame(checkNoise);
    };

    checkNoise();
  };

  const jump = (average) => {
    if (!isLoaded || !unityReadyRef.current) {
      return;
    }

    console.log("Jump!");
    sendMessage("Player", "SetJumpTriggerForce", average);
  };

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        position: "relative",
      }}
    >
      {/* Indicador de carga */}
      {!finishLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "18px",
            textAlign: "center",
            fontFamily: "Golden Age",
            zIndex: 999,
          }}
        >
                    <div
            style={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom: "20px" }}
          >
            <div
              className="social-btn_spacer"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/Signal.png`}
                alt=""
              />
            </div>
          </div>
          <div className="horizon">Loading...</div>
          <div
            className="horizon"
            style={{ marginTop: "10px", fontSize: "24px" }}
          >
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
          visibility: finishLoading ? "visible" : "hidden",
        }}
      />

    </div>
  );
}
