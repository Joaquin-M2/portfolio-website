import { forwardRef } from 'react';

interface AudioAPIProps {
  src: string;
}

const AudioAPI = forwardRef<HTMLAudioElement, AudioAPIProps>((props, ref) => {
  return <audio src={props.src} ref={ref}></audio>;
});

export default AudioAPI;
