package com.stream.app.services.impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.stream.app.entities.Video;
import com.stream.app.repositeries.VideoRepositery;
import com.stream.app.services.VideoService;

import jakarta.annotation.PostConstruct;

@Service
public class VideoServiceImpl implements VideoService{

	@Value("${files.video}")
	String DIR;
	
	@Value("${file.video.hls}")
	String HLS_DIR;
	
	private VideoRepositery videoRepositery;
	
	
	public VideoServiceImpl(VideoRepositery videoRepositery) {
	
		this.videoRepositery = videoRepositery;
	}

	@PostConstruct
	public void init() {
		
		File file = new File(DIR);
		
		try {
			Files.createDirectories(Paths.get(HLS_DIR));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		
		if(!file.exists()) {
			file.mkdir();
			System.out.println("Folder created");
		} else {
			System.out.println("folder already created");
		}
	}
	
	@Override
	public Video save(Video video, MultipartFile file) {
		
		//orignal file name
		
		try {
		
		String filename = file.getOriginalFilename();
		String contentType = file.getContentType();
		InputStream inputStream = file.getInputStream();
		
		
		//file path
		String cleanFileName = StringUtils.cleanPath(filename);
		
		//folder path create
		String cleanFolder = StringUtils.cleanPath(DIR);
		
		//folder path with filename
		Path path = Paths.get(cleanFolder, cleanFileName);
		
		System.out.println(path);
		
		
		// copy file to the folder
		Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);
		
		//video meta data
		System.out.println(path.toString());
		video.setContentType(contentType);
		video.setFilePath(path.toString());
		
		this.videoRepositery.save(video);
		
		//processing video while video saving
		processVideo(video.getVideoId());
		
		//delete actual video file if exception occured
		
		//metadata save to database
		return video;
		
		} catch (IOException e){
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public Video get(String videoId) {
		
		Video video = this.videoRepositery.findById(videoId).orElseThrow(() -> new RuntimeException("video not found"));
		
		
		return video;
	}

	@Override
	public Video getByTitle(String title) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Video> getAll() {
		
		return this.videoRepositery.findAll();
	}

	@Override
	public String processVideo(String videoId) {
		
		Video video = this.get(videoId);
		String filePath = video.getFilePath();
		
		//path where to store data
		
		Path videoPath = Paths.get(filePath);
		
//		String output360p = HLS_DIR+videoId+"/360p/";
//		String output720p = HLS_DIR+videoId+"/7200p/";
//		String output1080p = HLS_DIR+videoId+"/1080p/";
	
		try {
//		Files.createDirectories(Paths.get(output360p));
//		Files.createDirectories(Paths.get(output720p));
//		Files.createDirectories(Paths.get(output1080p));
		
		//ffmpeg command
		
		Path outputPath = Paths.get(HLS_DIR, videoId);
		
		Files.createDirectories(outputPath);
		
		String ffmpegCmd = String.format(
		
				"ffmpeg -i \"%s\" -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 10 -hls_list_size 0 -hls_segment_filename \"%s/segment_%%3d.ts\" \"%s/master.m3u8\" ",
				videoPath, outputPath, outputPath
				
		);
		
		System.out.println(ffmpegCmd);
		//file this command
		ProcessBuilder processBuilder = new ProcessBuilder("cmd.exe", "/c", ffmpegCmd);
		processBuilder.inheritIO();
		Process process = processBuilder.start();
		int exit = process.waitFor();
		if(exit != 0) {
			throw new RuntimeException("video processing failed");
		}
		
		return videoId;
		
		} catch(IOException ex) {
			throw new RuntimeException("video processing failed");
		} catch(InterruptedException e) {
			throw new RuntimeException(e);
		}
		
		
		
		
		
	}

}
