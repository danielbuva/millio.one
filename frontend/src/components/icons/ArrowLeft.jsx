import { useSelector } from "react-redux";
import { useEffect } from "react";

function ArrowLeft({ onClick, className, disabled, hide }) {
  const show = useSelector((s) => s.layout.show);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 37 && !disabled) {
        onClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClick, disabled]);
  return (
    <svg
      onClick={disabled || hide ? undefined : onClick}
      width="77"
      height="24"
      viewBox="0 0 77 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className + (show ? "" : "hide-cursor")}
      style={
        hide
          ? { opacity: 0, cursor: "default" }
          : disabled
          ? { cursor: "not-allowed" }
          : undefined
      }
    >
      <path
        d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92894 13.1924 1.97919 12.6066 1.3934C12.0208 0.807618 11.0711 0.807618 10.4853 1.3934L0.93934 10.9393ZM77 10.5L2 10.5L2 13.5L77 13.5L77 10.5Z"
        fill={disabled ? "#707070" : "#D2D2D2"}
      />
    </svg>
  );
}

export default ArrowLeft;
