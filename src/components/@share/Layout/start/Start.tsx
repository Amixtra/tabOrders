import { useState, useEffect } from "react";
import startSources from "db/start";
import {
  StartOverlay,
  StartWrapper,
  Logo,
  StartPhoto,
  StartDescription,
  StartLogo,
} from "./Start.style";
import logoSources from "db/logo";

const StartPage = () => {
  const messages = [
    { lang: "English", text: "Tap anywhere on the screen to continue." },
    { lang: "Korean", text: "화면을 아무 곳이나 터치하세요." },
    { lang: "Japanese", text: "画面のどこでもタップしてください。" },
    { lang: "Chinese", text: "点击屏幕任意位置继续。" },
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");

      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setFadeClass("fade-in");
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StartOverlay>
      <StartWrapper>
        <Logo>
          <StartLogo src={logoSources["defaultLight"]} />
        </Logo>
        <StartDescription className={fadeClass}>
          {messages[currentMessageIndex].text}
        </StartDescription>
        <StartPhoto src={startSources["default"]} />
      </StartWrapper>
      <style>{`
        .fade-in {
          opacity: 1;
          transition: opacity 1s ease-in;
        }
        .fade-out {
          opacity: 0;
          transition: opacity 1s ease-out;
        }
      `}</style>
    </StartOverlay>
  );
};

export default StartPage;
