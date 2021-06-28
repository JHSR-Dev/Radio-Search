import React, { useEffect, useState } from "react"
import { RadioBrowserApi } from "radio-browser-api"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"


const api = new RadioBrowserApi('Radio-Search')

export default function Radio() {
  const [station, setStation] = useState()

  useEffect(()=> {
     callStation()
      })

  const callStation = async () => {
     const station = await api.searchStations({
         language: 'english',
         tag: 'jazz',
         limit: 1, 
     }).then(data => {
        setStation(data)
      })

     return station
  }
  
  console.log(station)
  return (
    <div className="radio">
    <h1>RADIO STATIONS</h1>
   <button>SEARCH</button>
     <AudioPlayer
  src = "https://rautemusik-de-hz-fal-stream15.radiohost.de/solopiano?ref=radiobrowser&listenerid=31363234383933303031-323030313a313966303a353030313a333261343a353430303a3266663a666533373a37356332-3431323232-53747265616d436865636b426f742f302e312e30"
  className="player"
  showJumpControls={false}
  layout="stacked"
  customProgressBarSection={[]}
  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
  autoPlayAfterSrcChange={false}
/>
    </div>
  )
}