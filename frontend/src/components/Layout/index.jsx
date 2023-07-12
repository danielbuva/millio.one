// import useIsLoaded from "../../hooks/useIsLoaded";
import { Outlet } from "react-router-dom";
import NavButtons from "./NavButtons";
import UserMenu from "./UserMenu";
import Title from "./Title";

import "./Layout.css";

function Layout() {
  // const isLoaded = useIsLoaded();

  return (
    <div id="layout">
      <div id="left">
        <div id="content-left-container">
          <div id="content-left">
            <NavButtons />
          </div>
        </div>
      </div>
      <div id="main">
        <Title />
        {true && <Outlet />}
      </div>
      <div id="right">
        <div id="content-right-container">
          <div id="right-cut-off">
            <UserMenu />
          </div>
          <div id="content-right"></div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
