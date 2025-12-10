import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUpload from './components/VideoUpload'
import { Toaster } from 'react-hot-toast'
import VideoPlaayer from './components/VideoPlaayer'
import { Button, TextInput } from 'flowbite-react'

function App() {
  const [count, setCount] = useState(0)
  const [filedValue, setFieldValue] = useState(null)
  const [videoId, setVideoId] = useState("23ccbb36-fd55-4088-ad20-254a438e3981")

  function playVideoId(){
    setVideoId(videoId);
  }

  return (
    <>
      <Toaster/>
      <div className="flex flex-col items-center space-y-9 justify-center py-9">
        <h1 className='text-4xl font-bold  text-gray-700 dark:text-gray-100'>
          Video Streaming Application
        </h1>

       <div className= "flex flex-col lg:flex-row w-full mt-14 justify-between max-w-7xl mx-auto p-4 mb-0">
         <div className='w-full lg:w-4/8 lg:mr-8'>

          <h1 className='text-xl font-bold mb-4 text-center mt-2 text-white'>Playing video</h1>
          {/* <video 
          style={{
              width:500,
              
            }}
          // src={`http://localhost:8080/api/v1/videos/stream/range/${videoId}`}
          src="http://localhost:8080/api/v1/videos/e31b62f0-dbdb-40a7-a6f6-364345730c1e/master.m3u8"
           controls>

          </video> */}/

            <div>

            <VideoPlaayer src={`http://localhost:8080/api/v1/videos/${videoId}/master.m3u8`}>

            </VideoPlaayer>

            </div>

         </div>

          <div className='w-full lg:w-2/6 mt-8 lg:mt-0'>
              <VideoUpload/>
          </div>
        
       </div>

       <div className='my-4 flex space-x-4'>
            <TextInput onChange={(event)=>{
              setFieldValue(event.target.value);
            }} 
            placeholder='Enter video id here' 
            name="video_id_field"
            />
            <Button onClick={()=>{
              setVideoId(filedValue);
            }}>Play</Button>

       </div>
      </div>
    </>
  )
}

export default App
