function Spirituality({ active, onClick }) {
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
        d="M32.0255 18.1324C32.1699 18.1823 32.3771 18.2557 32.6379 18.3532C33.1595 18.5482 33.8975 18.8399 34.78 19.2327C36.5408 20.0163 38.8992 21.212 41.2683 22.8579C45.9548 26.1138 51 31.3661 51 38.9163C51 42.2171 50.1173 45.4848 48.0621 47.9571C45.9706 50.4731 42.7997 52 38.6 52C38.4996 52 38.0966 51.9966 37.6962 51.71C37.1377 51.3105 37.0033 50.6919 37.0632 50.2474C37.1083 49.9126 37.2523 49.6842 37.2943 49.6188C37.3547 49.5247 37.4127 49.4571 37.4428 49.4234C37.5041 49.3545 37.5586 49.3063 37.5781 49.2891C37.6041 49.2662 37.626 49.2485 37.6392 49.2381C37.6801 49.2055 37.7201 49.177 37.7323 49.1684L37.734 49.1671L37.8537 49.0828C37.9431 49.0196 38.071 48.9274 38.2261 48.8063C38.5389 48.562 38.956 48.2051 39.3702 47.7514C40.2194 46.8209 40.925 45.6317 40.925 44.2679C40.925 41.7443 39.485 39.3991 37.8354 37.5704C37.0297 36.6772 36.2198 35.9586 35.6108 35.4634C35.573 35.4327 35.5361 35.403 35.5 35.374C35.4639 35.403 35.427 35.4327 35.3892 35.4634C34.7802 35.9586 33.9703 36.6772 33.1646 37.5704C31.515 39.3991 30.075 41.7443 30.075 44.2679C30.075 45.6422 30.7788 46.832 31.6223 47.7573C32.0343 48.2091 32.4494 48.5637 32.7607 48.8051C32.9151 48.9248 33.042 49.0153 33.1285 49.0753C33.1646 49.1005 33.1928 49.1197 33.2186 49.1371L33.2372 49.1498C33.248 49.1571 33.2734 49.1744 33.297 49.1913C33.304 49.1964 33.3515 49.2302 33.4038 49.2746C33.4204 49.2887 33.4497 49.3142 33.4842 49.3479C33.5089 49.3719 33.5853 49.4472 33.6643 49.5585C33.7057 49.6196 33.7965 49.7821 33.8418 49.8854C33.8985 50.0572 33.9486 50.5232 33.9086 50.8094C33.7795 51.1591 33.3342 51.6876 33.0574 51.854C32.8617 51.9298 32.5293 51.9946 32.4 52C28.2002 52 25.0294 50.4731 22.9379 47.9571C20.8828 45.4848 20 42.2171 20 38.9163C20 34.9728 21.3695 32.4866 23.1819 30.59C24.0246 29.7082 24.9556 28.9619 25.7905 28.2926L25.8567 28.2395C26.7363 27.5342 27.5062 26.9108 28.1651 26.2042C29.7777 24.4744 30.1439 22.9076 30.1689 21.8419C30.1817 21.292 30.1038 20.8462 30.0276 20.5492C29.9897 20.4013 29.9527 20.2925 29.9292 20.229C29.9174 20.1973 29.9091 20.1773 29.9059 20.1696C29.6522 19.6161 29.7469 18.9635 30.15 18.5053C30.6482 17.939 31.3597 17.9026 32.0255 18.1324Z"
        fill={pathFill}
      />
    </svg>
  );
}

export default Spirituality;