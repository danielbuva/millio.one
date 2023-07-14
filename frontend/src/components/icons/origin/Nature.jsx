function Nature({ active, onClick }) {
  const circleFill = active ? "#ffffff" : "#000000";
  const pathFill = active ? "#000000" : "#ffffff";

  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon-selection"
      onClick={onClick}
    >
      <circle cx="35" cy="35" r="34.5" fill={circleFill} stroke="white" />
      <path
        d="M16.4015 31.7672C16.771 31.8145 17.1389 31.8595 17.5043 31.9038C18.3325 32.0047 19.1152 32.1004 19.8971 32.2205C20.5012 32.3136 21.0627 32.4406 21.5763 32.6006C21.5681 32.9933 21.5686 33.3953 21.5948 33.8089C21.7595 36.3819 22.6122 38.8508 24.2011 41.3569C27.1004 45.9292 31.1186 48.5371 36.1436 49.1084C39.766 49.5203 43.1727 49.0972 46.2684 47.8507C49.4052 46.5877 52.2714 44.4587 54.7883 41.5216C54.9827 41.2943 55.0834 41.0801 55.1385 40.9607C55.4015 40.446 55.4181 39.8395 55.1828 39.3109C54.9449 38.7765 54.4757 38.3803 53.9089 38.2352C51.6219 37.6498 49.8275 36.4498 48.423 34.5667C47.9187 33.8908 47.4398 33.0335 46.8853 32.0411C46.6549 31.6287 46.4119 31.194 46.1471 30.735C46.1228 30.6932 46.0969 30.652 46.0695 30.6115C44.9171 28.9255 43.8177 27.3887 42.0335 25.655C38.4455 22.1683 34.2446 21.0664 29.5478 22.3802C29.2061 22.4755 28.8664 22.591 28.5383 22.7231C27.0701 23.3143 25.7227 24.2825 24.533 25.6021C24.316 25.8426 24.1668 26.1307 24.0933 26.4374C22.3071 25.7591 20.4331 25.2502 18.4783 24.9136C17.9173 24.8169 17.389 24.8664 16.9094 25.0595C16.3677 25.2776 15.9197 25.6644 15.5781 26.2094C14.8724 27.3338 14.5902 28.632 14.74 30.0673C14.833 30.9501 15.5207 31.6543 16.4015 31.7672Z"
        fill={pathFill}
      />
      <path
        d="M20.1887 30.3285C21.3628 30.509 22.505 30.8194 23.5251 31.3112C23.5153 32.1345 23.4562 32.9137 23.5055 33.686C23.6607 36.1101 24.5298 38.2991 25.8183 40.3313C28.2859 44.223 31.7354 46.6805 36.3604 47.2062C43.2541 47.9901 48.8637 45.4945 53.3347 40.2767C53.374 40.2308 53.3937 40.1684 53.4351 40.089C50.6833 39.3845 48.517 37.8925 46.8898 35.7107C46.0877 34.6355 45.4273 33.3151 44.4904 31.6915C43.2542 29.8828 42.2797 28.5619 40.7007 27.0272C37.6802 24.092 34.1459 23.0813 30.0644 24.2227C28.4408 24.6765 27.0972 25.6175 25.9557 26.8833C26.5061 27.1613 27.045 27.4189 27.5704 27.7004C30.0146 29.0106 32.0498 30.4435 33.9976 32.3902C35.5045 33.8964 36.1352 34.6246 38.5983 37.2182C40.5114 38.945 42.7589 40.0746 45.3107 40.5546C45.5257 40.5952 45.7407 40.6357 45.9556 40.6763C45.8644 40.7347 45.7764 40.7524 45.6933 40.7383C44.4939 40.5358 43.2731 40.4123 42.1002 40.106C39.6523 39.4667 37.5508 38.1393 35.6136 36.5509C34.043 35.2637 32.5146 33.9255 30.9525 32.6277C27.2175 29.524 22.9342 27.622 18.1553 26.7998C17.6955 26.7209 17.4226 26.8726 17.2005 27.2262C16.6871 28.0445 16.548 28.9391 16.6447 29.8685C17.8433 30.0218 19.0203 30.1488 20.1887 30.3285Z"
        fill={circleFill}
      />
    </svg>
  );
}
export default Nature;
