import React from 'react'
import videoLogo from '../assets/uploadVideo.png'
import { Alert, Card, FileInput, Label, Progress, Textarea, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import axios from 'axios';
import toast from 'react-hot-toast';

    // 
    

function VideoUpload() {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [meta, setMeta] = React.useState({
        title: "",
        description: "",
    });
    const [uploading, setUploading] = React.useState(false);
    const [message, setMessage] = React.useState("");

    function handleFileChange(event) {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    }

    function formFieldChange(event){
        // console.log(event.target.name);
        // console.log(event.target.value);
        setMeta({
            ...meta,
            [event.target.name] : event.target.value
        })
    }



    function handleForm(formEvent) {
        formEvent.preventDefault();

        if(!selectedFile){
            alert("please sealect a file to upload");
            return ;
        }
       
        //submit file to server
        saveVideoToServer(selectedFile, meta);
        
        
    }

    function resetForm(){
        setMeta({
            title:"",
            description:"",

        });
        setSelectedFile(null);
        setUploading(false);
        // setMessage("");
    }


     async function saveVideoToServer(video, videoMetaData){
            setUploading(true);
            // api call 
            try {

                let formData = new FormData();
                formData.append("title", videoMetaData.title);
                formData.append("description", videoMetaData.description);
                formData.append("file", selectedFile);

                let response =await axios.post(`http://localhost:8080/api/v1/videos`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress:(ProgressEvent)=>{

                        const progress = Math.round((ProgressEvent.loaded * 100)/ ProgressEvent.total);
                        console.log(progress);
                        setProgress(progress);

                    },
                });
                console.log(response);
                setProgress(0);
                setMessage("file uploaded successfully!!  Video ID: " + response.data.videoId);
                setUploading(false);
                toast.success("File uploaded successfully");
                resetForm();
            } catch (error) {

                console.log(error);
                setMessage("error in uploading file");
                setUploading(false);
                toast.error("File not uploaded");
            }
    }
    

  return (
  <div className="text-white">
<Card className='flex flex-col items-center justify-center'>
    <h1>Upload Videos</h1>

    <div>

        <form noValidate className="flex flex-col space-y-6" onSubmit={handleForm}>

            <>
                <Label className="mb-2 block" htmlFor="Video Title">
                    Upload file
                </Label>
                <TextInput value={meta.title} onChange={formFieldChange} name="title" placeholder='Enter Title' />
            </>

            <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="comment">Video Description</Label>
                </div>
                <Textarea value={meta.description} onChange={formFieldChange} name="description" id="comment" placeholder="Write video description" required rows={4} />
            </div>

            <div className='flex items-center space-x-6 justify-center'>
            <div className="shrink-0">
                <img className="h-16 w-16 object-cover" src={videoLogo} alt="Current profile photo" />
            </div>
            <label className="block">
                <span className="sr-only">Choose Video File</span>
                <input onChange={handleFileChange}
                name="file"
                type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                "/>
            </label>
            </div>
           
           <div className="">
                    {uploading && 
                        <Progress 
                       
                        progress={progress}
                        progressLabelPosition="inside"
                        textLabel="Uploadng..."
                        textLabelPosition="outside"
                        size="xl"
                        color="cyan"
                        labelProgress
                        labelText
                     />
                    }
           </div>

           <div className="">
                    {message && 
                        <Alert color={"success"} 
                                rounded 
                                withBorderAccent
                                onDismiss={() => {
                                    setMessage("");
                                }}
                                >
                        <span className='font-medium'>Success Alert </span>
                        {message}
                    </Alert>
                    }
           </div>

           <div className='flex justify-center'>
              <Button disabled={uploading} type="submit">Submit</Button>

           </div>
           
        </form>    
    </div>
            
</Card>    

</div>
  )
}
export default VideoUpload;