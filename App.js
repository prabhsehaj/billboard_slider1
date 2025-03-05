import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { FaMusic, FaImage, FaVideo } from "react-icons/fa";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import local media files
import localImage from "./assets/wallpaper.jpeg";
import localImage1 from "./assets/dodge.jpg";
import localImage2 from "./assets/gwagon.jpg";
import localImage3 from "./assets/jeep.jpg";  
import localImage4 from "./assets/mustang.jpg";
import localVideo from "./assets/videoplayback.webm";
import localVideo1 from "./assets/video2.webm";

const slides = [
  { type: "image", src: localImage, title: "Local Image" },
  { type: "image", src: localImage1, title: "Sample Image" },
  { type: "image", src: localImage2, title: "Sample Image" },
  { type: "image", src: localImage3, title: "Sample Image" },
  { type: "image", src: localImage4, title: "Sample Image" },
  { type: "video", src: localVideo, title: "Sample Video" },
  { type: "video", src: localVideo1, title: "Sample Video" },
  { type: "audio", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", title: "Sample MP3" },
];

export default function MediaSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef({}); // Store refs as an object

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjusted autoplay speed for better transition
    afterChange: (current) => setActiveIndex(current), // Track the active slide
  };

  useEffect(() => {
    Object.values(videoRefs.current).forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play(); // Play active video
        } else {
          video.pause(); // Pause others
          video.currentTime = 0; // Reset to beginning
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-lg bg-white">
            {slide.type === "image" && (
              <>
                <FaImage size={40} className="text-blue-500 mb-3" />
                <img 
                  src={slide.src} 
                  alt={slide.title} 
                  className="rounded-lg"
                  style={{ width: "100%", height: "650px", objectFit: "cover" }} // Fixed size
                />
              </>
            )}
            {slide.type === "video" && (
              <>
                <FaVideo size={40} className="text-purple-500 mb-3" />
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="rounded-lg"
                  style={{ width: "100%", height: "600px", objectFit: "cover" }} // Fixed size
                  muted
                  loop // You can decide whether to loop videos
                >
                  <source src={slide.src} type="video/webm" />
                  Your browser does not support the video element.
                </video>
              </>
            )}
            {slide.type === "audio" && (
              <>
                <FaMusic size={40} className="text-green-500 mb-3" />
                <audio controls className="w-full">
                  <source src={slide.src} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}
