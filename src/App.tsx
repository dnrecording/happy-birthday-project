import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import birthdayPhoto from "./assets/images/birthday-photo.jpg";
import birthdayVideo from "./assets/media/birthday-video.mp4";
import backgroundMusic from "./assets/media/Love Like You (Ending Theme) - Steven Universe Piano Cover.mp3";

const Container = styled.div`
  min-height: 100vh;
  min-height: -webkit-fill-available;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  color: #2c1810;
  position: relative;
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: transparent;
`;

const Page = styled(motion.div)`
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  padding: 0;
  box-sizing: border-box;
  overflow-y: auto;
`;

const LandingPage = styled(motion.div)`
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #ffffff;
  padding: clamp(0.5rem, 3vw, 2rem);
  box-sizing: border-box;
  margin: 0;
  gap: 1rem;
`;

const LandingTitle = styled(motion.h1)`
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  color: #2c1810;
  margin-bottom: 0.5rem;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.4;
  padding: 0 1rem;
  width: 100%;
  max-width: 600px;
`;

const LandingSubtitle = styled(motion.p)`
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  color: #666;
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
  opacity: 0.8;
  padding: 0 1rem;
  line-height: 1.5;
  width: 100%;
  max-width: 600px;
`;

const LetterPhoto = styled(motion.img)`
  width: min(250px, 85%);
  height: 250px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 0.25rem auto;
  border: 1px solid rgba(44, 24, 16, 0.1);
`;

const AudioControls = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  padding: 0.5rem;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AudioButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const AudioPlayer = styled.audio`
  display: none;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #000;
  margin: 0.25rem 0;
  aspect-ratio: 16/9;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`;

const LetterContent = styled(motion.div)`
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  line-height: 1.8;
  color: #333;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-align: justify;
  margin: 0.5rem 0;
  padding: 0 1rem;
  width: 100%;
  max-width: 600px;
  overflow-y: auto;
  max-height: 60vh;

  p {
    margin-bottom: 0.75rem;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  gap: 0.75rem;
  position: sticky;
  bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  box-sizing: border-box;
`;

const NavButton = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(44, 24, 16, 0.2);
  color: #2c1810;
  padding: 0.7rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  transition: all 0.3s ease;
  font-weight: 300;
  letter-spacing: 0.5px;
  flex: 1;
  justify-content: center;

  &:hover {
    background: rgba(44, 24, 16, 0.05);
  }
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: "tween" as const,
  duration: 0.5,
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set fixed volume to 20%
    audio.volume = 0.2;

    // Add event listeners
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Play on first interaction only
    const handleFirstInteraction = () => {
      if (!hasInteracted && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((error) => {
            console.error("Failed to play:", error);
          });
      }
      document.removeEventListener("click", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, [isPlaying, hasInteracted]);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    const handleVideoPlay = () => {
      audio.pause();
      setIsPlaying(false);
    };

    const handleVolumeChange = () => {
      if (video.volume !== 0.5) {
        video.volume = 0.5;
      }
    };

    video.addEventListener("play", handleVideoPlay);
    video.addEventListener("volumechange", handleVolumeChange);
    // Set initial volume
    video.volume = 0.5;

    return () => {
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Failed to play:", error);
      });
    }
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleVideoPage = () => {
    setCurrentPage(8); // Video page index
    // Stop the music when entering video page
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoPageBack = () => {
    setCurrentPage(7); // Back to the page before video
    // Resume music when going back
    const audio = audioRef.current;
    if (audio && hasInteracted) {
      audio.play().catch((error) => {
        console.error("Failed to play:", error);
      });
    }
  };

  return (
    <Container>
      <AudioControls>
        <AudioButton onClick={togglePlay}>
          {isPlaying ? "🎵" : "🔇"}
        </AudioButton>
      </AudioControls>
      <AudioPlayer ref={audioRef} src={backgroundMusic} loop />
      <AnimatePresence mode="wait">
        {currentPage === 0 ? (
          <Page
            key="landing1"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage onClick={handleNext} style={{ cursor: "pointer" }}>
              <LandingTitle>For Someone Special ...?</LandingTitle>
              <LandingSubtitle>Please open it slowly</LandingSubtitle>
            </LandingPage>
          </Page>
        ) : currentPage === 1 ? (
          <Page
            key="landing2"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <LandingTitle>
                Today is June 16th, and it's your belated birthday 🎉
              </LandingTitle>
              <NavigationButtons>
                <NavButton
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 2 ? (
          <Page
            key="landing3"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <LandingTitle>This cutie 🫶</LandingTitle>
              <LetterPhoto
                src={birthdayPhoto}
                alt="Special Memory"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <NavigationButtons>
                <NavButton
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 3 ? (
          <Page
            key="landing4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <LandingTitle>
                I also have a card for you. Open it to see what's inside 🤫
              </LandingTitle>
              <NavigationButtons>
                <NavButton
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 4 ? (
          <Page
            key="landing5"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <LandingTitle>
                Promise me, don't cry when you read it
              </LandingTitle>
              <LandingSubtitle>Because I will cry too 🥺</LandingSubtitle>
              <NavigationButtons>
                <NavButton
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 5 ? (
          <Page
            key="landing6"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <LandingTitle>Now, open it 💌</LandingTitle>
              <NavigationButtons>
                <NavButton
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 6 ? (
          <Page
            key="letter"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <LandingTitle>Happy Birthday 🎂🎉</LandingTitle>
              <LetterContent>
                <p>To Babyboo Pai,</p>
                <p>
                  I'm not sure if you'll be surprised or not. I remember that
                  you want me to do something like this e.g. using my
                  programming skills 💻 . It's a second time of your birthday
                  that I be part of it, so I decided to make this for you.
                </p>
                <br />
                <p>
                  I wish you a very happy birthday, and I hope you'll have a
                  great year. We're going to have a big trip together, and I'm
                  very excited for that. I know you're stressed about the CPA
                  exam thingy 😡, but I will be there for you. Don't worry about
                  the result, I'm sure you'll pass it and we will celebrate it
                  together again.
                </p>
                <p>
                  Long story short, thank you for being you, and making every
                  moment special ✨.
                </p>
                <br />
                <p>
                  If you read until here, you might have known that I can't make
                  this by myself in a day. To be honest, I used AI to help me.
                  I'm not a good writer, but I wrote this with my heart. I hope
                  you'll like it.
                </p>
                <br />
                <p>Luv u, and happy birthday ❤️</p>
                <p>Dragon, your babyboo</p>
              </LetterContent>
              <NavigationButtons>
                <NavButton
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 7 ? (
          <Page
            key="landing8"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <LandingTitle>
                Let's see our short memories together 🎬
              </LandingTitle>
              <LandingSubtitle>
                It's really short because I don't have much time to make it. But
                I hope you'll like it.
              </LandingSubtitle>
              <NavigationButtons>
                <NavButton
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleVideoPage}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 8 ? (
          <Page
            key="video"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage>
              <VideoContainer>
                <Video
                  ref={videoRef}
                  src={birthdayVideo}
                  controls
                  playsInline
                  preload="auto"
                />
              </VideoContainer>
              <NavigationButtons>
                <NavButton
                  onClick={handleVideoPageBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </NavButton>
              </NavigationButtons>
            </LandingPage>
          </Page>
        ) : currentPage === 9 ? (
          <Page
            key="back"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LandingPage onClick={handleBack} style={{ cursor: "pointer" }}>
              <LandingTitle>Now, the gift is coming 🎁</LandingTitle>
              <LandingSubtitle>Click to go back</LandingSubtitle>
            </LandingPage>
          </Page>
        ) : null}
      </AnimatePresence>
    </Container>
  );
};

export default App;
