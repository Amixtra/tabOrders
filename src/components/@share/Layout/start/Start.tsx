import { useState, useEffect } from "react";
import { startSources, logoSources } from "db/constants";
import {
  StartOverlay,
  StartWrapper,
  Logo,
  StartPhoto,
  StartDescription,
  StartLogo,
} from "./Start.style";

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
    let timeoutId: ReturnType<typeof setTimeout>;
    const intervalId = setInterval(() => {
      setFadeClass("fade-out");
      timeoutId = setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setFadeClass("fade-in");
      }, 1000);
    }, 3000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [messages]);

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
