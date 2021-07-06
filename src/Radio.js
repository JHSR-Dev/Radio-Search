import React, { useEffect, useState } from 'react';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Radio.css';
import Button from '@material-ui/core/Button';
import defaultImage from './7a7E.gif';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export default function Radio() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState('all');

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), 'My Radio App');

    const stations = await api
      .searchStations({
        language: 'english',
        tag: stationFilter,
        limit: 50,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  const filters = [
    'all',
    'classical',
    'country',
    'dance',
    'disco',
    'house',
    'jazz',
    'pop',
    'rap',
    'retro',
    'rock',
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className='radio'>
      <div className='filters'>
        {filters.map((filter, index) => (
          <Button variant='contained' color='primary'>
            <span
              key={index}
              className={stationFilter === filter ? 'selected' : ''}
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </span>
          </Button>
        ))}
      </div>
      <div className='stations'>
        {stations &&
          stations.map((station, index) => {
            return (
              <Card className='station' key={index}>
                <CardHeader className='stationName' title={station.name}/>
                <CardMedia className ='logo' image = {station.favicon ? station.favicon : defaultImage} title='station logo'/>
                <CardContent>
                 <AudioPlayer
                  className='player'
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout='stacked'
                  customProgressBarSection={[]}
                  customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
                  autoPlayAfterSrcChange={false}
                />
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
