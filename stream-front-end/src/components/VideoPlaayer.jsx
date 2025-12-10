import React, { useEffect } from 'react'
import videojs from 'video.js'
import Hls from 'hls.js'
import "video.js/dist/video-js.css"
import toast from 'react-hot-toast';

function VideoPlaayer({src}) {

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    useEffect(() => {
        //for init

        playerRef.current=videojs(videoRef.current,{
            controls:true,
            autoplay: true,
            muted: true,
            preload: "auto",


        });

        if(Hls.isSupported()){
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED,()=>{
                videoRef.current.play();
            });
        }else if(videoRef.current.canPlayType("application/vnd.apple.mpegurl"))
        {
            videoRef.current.src = src;
            videoRef.current.addEventListener("canplay", ()=>{
                videoRef.current.play();
            });
        } else{
            console.log("Video formant not supported");
            toast.error("Video formant not supported");
        }
        


    },[src])

  return (
    <div>
        <div data-vjs-player>

            <video ref={videoRef}
            style={{width:"100%",
                    height: "400px",
            }}
            className="video-js vjs-contorl-bar"
            ></video>

        </div>
    </div>
  )
}

export default VideoPlaayer