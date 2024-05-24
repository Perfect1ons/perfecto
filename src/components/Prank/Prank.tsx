"use client";
import { useEffect } from "react";

function playVideo() {
  const iframe = document.querySelector(".videoBlur") as HTMLIFrameElement;
  if (iframe) {
    iframe.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo" }),
      "*"
    );
  }
}

export default function Prank() {
  useEffect(() => {
    playVideo();
  }, []);

  return (
    <div className="container">
      <h1 className="section__title biggg">Тут будет регистрация, а пока</h1>
      <iframe
        className="videoBlur"
        width="1280"
        height="591"
        src="https://www.youtube.com/embed/nz-V3g6-1KQ?autoplay=1"
        title="Indian meme song"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        onLoad={playVideo}
      ></iframe>
    </div>
  );
}
