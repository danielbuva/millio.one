import { useRef } from "react";
import { Link } from "react-router-dom";

function CheckIn({ p1, p2, p3, src, show }) {
  const videoRef = useRef(null);

  return (
    <Link
      className="check-in-tile"
      to={`/${p1}/check-in`}
      onMouseEnter={() => {
        if (videoRef.current) videoRef.current.playbackRate = 6.0;
      }}
      onMouseLeave={() => {
        if (videoRef.current) videoRef.current.playbackRate = 1.0;
      }}
    >
      <div className="check-in-tile-header">
        {p1} <br /> {p2} <br /> <span>{p3}</span>
      </div>
      {show && <p className="begin">begin</p>}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          src={src}
          className="tile-video"
        />
      </div>
    </Link>
  );
}

export default CheckIn;
