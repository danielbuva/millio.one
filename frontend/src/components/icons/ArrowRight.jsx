function ArrowRight({ onClick }) {
  return (
    <svg
      onClick={onClick}
      width="77"
      height="24"
      viewBox="0 0 77 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="arrow"
    >
      <path
        d="M76.0607 13.0607C76.6464 12.4749 76.6464 11.5251 76.0607 10.9393L66.5147 1.3934C65.9289 0.807612 64.9792 0.807612 64.3934 1.3934C63.8076 1.97918 63.8076 2.92893 64.3934 3.51472L72.8787 12L64.3934 20.4853C63.8076 21.0711 63.8076 22.0208 64.3934 22.6066C64.9792 23.1924 65.9289 23.1924 66.5147 22.6066L76.0607 13.0607ZM0 13.5H75V10.5H0V13.5Z"
        fill="#D2D2D2"
      />
    </svg>
  );
}

export default ArrowRight;
