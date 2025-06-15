import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import birthdayPhoto from './assets/images/birthday-photo.jpg';
import birthdayVideo from './assets/media/birthday-video.mp4';
import backgroundMusic from './assets/media/Love Like You (Ending Theme) - Steven Universe Piano Cover.mp3';

const Container = styled.div`
  min-height: 100vh;
  min-height: -webkit-fill-available;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  color: #2c1810;
  position: relative;
  -webkit-overflow-scrolling: touch;
`;

const Page = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  padding: 1rem;
  box-sizing: border-box;
`;

const Letter = styled(motion.div)`
  background: #ffffff;
  width: 100%;
  max-width: 800px;
  min-height: 80vh;
  min-height: -webkit-fill-available;
  padding: clamp(1rem, 3vw, 4rem);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
  margin: 0 1rem;
`;

const LetterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Date = styled.div`
  font-family: "Courier New", monospace;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #2c1810;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
`;

const Content = styled.div`
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.8;
  color: #333;
  font-weight: 300;
  letter-spacing: 0.5px;
  text-align: justify;
  margin: 2rem 0;
`;

const Signature = styled.div`
  margin-top: 3rem;
  text-align: right;
  font-style: italic;
  color: #666;
`;

const FrontPage = styled(motion.div)`
  width: min(800px, 90%);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;

const FrontTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: #2c1810;
  margin-bottom: 2rem;
  font-weight: 300;
  letter-spacing: 3px;
  line-height: 1.4;
`;

const FrontSubtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #666;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 2rem;
  opacity: 0.8;
`;

const LetterBackButton = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #666;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 2rem;
  cursor: pointer;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const LetterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`;

const LetterButton = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(44, 24, 16, 0.2);
  color: #2c1810;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.9rem, 2vw, 1rem);
  transition: all 0.3s ease;
  font-weight: 300;
  letter-spacing: 1px;

  &:hover {
    background: rgba(44, 24, 16, 0.05);
  }
`;

const LetterPhoto = styled(motion.img)`
  width: min(300px, 80%);
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  border: 1px solid rgba(44, 24, 16, 0.1);
`;

const AudioControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
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

const VideoPage = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  min-height: 80vh;
  min-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  box-sizing: border-box;
  margin: 0 1rem;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 800px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #000;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  display: block;
  max-height: 80vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
`;

const VideoBackButton = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(44, 24, 16, 0.2);
  color: #2c1810;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: clamp(0.9rem, 2vw, 1rem);
  transition: all 0.3s ease;
  font-weight: 300;
  letter-spacing: 1px;

  &:hover {
    background: rgba(44, 24, 16, 0.05);
  }
`;

const BackPage = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  min-height: 80vh;
  min-height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #ffffff;
  padding: clamp(1rem, 3vw, 4rem);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0 1rem;
`;

const BackPageText = styled(motion.p)`
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  color: #2c1810;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.6;
  margin-bottom: 2rem;
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

  const handleFrontPageClick = () => {
    setCurrentPage(1);
  };

  const handleLetterPageClick = () => {
    setCurrentPage(2);
    // Stop the music when entering video page
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleReturn = () => {
    setCurrentPage(0);
    // Resume music when going back to front page
    const audio = audioRef.current;
    if (audio && hasInteracted) {
      audio.play().catch((error) => {
        console.error("Failed to play:", error);
      });
    }
  };

  const handleLetterPageBack = () => {
    setCurrentPage(0);
  };

  const handleBackPageReturn = () => {
    setCurrentPage(1);
    // Resume music when going back to letter page
    const audio = audioRef.current;
    if (audio && hasInteracted) {
      audio.play().catch((error) => {
        console.error("Failed to play:", error);
      });
    }
  };

  const handleLetterBackClick = () => {
    setCurrentPage(3);
  };

  return (
    <Container>
      <AudioControls>
        <AudioButton onClick={togglePlay}>
          {isPlaying ? "🎵" : "🔇"}
        </AudioButton>
      </AudioControls>
      <AudioPlayer
        ref={audioRef}
        src={backgroundMusic}
        loop
      />
      <AnimatePresence mode="wait">
        {currentPage === 0 ? (
          <Page
            key="front"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FrontPage onClick={handleFrontPageClick}>
              <FrontTitle>For Someone Special ...?</FrontTitle>
              <FrontSubtitle>Click to open</FrontSubtitle>
            </FrontPage>
          </Page>
        ) : currentPage === 1 ? (
          <Page
            key="letter"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Letter>
              <LetterHeader>
                <Date>June 15, 2025</Date>
                <Title>Happy Birthday 🎂🎉</Title>
              </LetterHeader>
              <LetterPhoto
                src={birthdayPhoto}
                alt="Special Memory"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              <Content>
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
              </Content>

              <Signature>
                <p>Luv u, and happy birthday ❤️</p>
                <p>Dragon, your babyboo</p>
              </Signature>

              <LetterButtonContainer>
                <LetterButton
                  onClick={handleLetterPageBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </LetterButton>
                <LetterButton
                  onClick={handleLetterPageClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </LetterButton>
              </LetterButtonContainer>
            </Letter>
          </Page>
        ) : currentPage === 2 ? (
          <Page
            key="video"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <VideoPage>
              <VideoContainer>
                <Video
                  ref={videoRef}
                  src={birthdayVideo}
                  controls
                  playsInline
                  preload="auto"
                />
              </VideoContainer>
              <ButtonContainer>
                <VideoBackButton
                  onClick={handleReturn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Back
                </VideoBackButton>
                <VideoBackButton
                  onClick={handleLetterBackClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <FaArrowRight />
                </VideoBackButton>
              </ButtonContainer>
            </VideoPage>
          </Page>
        ) : (
          <Page
            key="back"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <BackPage>
              <BackPageText>
                <p>Now, the gift is coming 🎁 ... </p>
              </BackPageText>
              <LetterBackButton
                onClick={handleBackPageReturn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaArrowLeft /> Back to Letter
              </LetterBackButton>
            </BackPage>
          </Page>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default App;
