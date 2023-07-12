import { useLocation } from "react-router-dom";
import useSessionUser from "../../../../hooks/useSessionUser";

function Profile() {
  const { pathname } = useLocation();
  const currentUser = useSessionUser()
  const isOnProfile = pathname.includes(currentUser.id)

  const d = isOnProfile
    ? "M2.651 17 Z M 3.137 11.44 C 4.627 9.85 6.648 9 9 9 C 11.352 9 13.373 9.85 14.863 11.44 C 16.34 13.02 17.229 15.24 17.495 17.9 L 17.605 19 H 0.395 L 0.505 17.9 C 0.771 15.24 1.66 13.02 3.137 11.44 Z Z M 5 4 C 5 1.79 6.791 0 9 0 C 11.209 0 13 1.79 13 4 C 13 6.21 11.209 8 9 8 C 6.791 8 5 6.21 5 4 Z"
    : "M2.65099 17H15.349C15.012 15.2 14.326 13.79 13.404 12.81C12.318 11.65 10.838 11 8.99999 11C7.16199 11 5.68299 11.65 4.59599 12.81C3.67399 13.79 2.98799 15.2 2.65099 17ZM3.13699 11.44C4.62699 9.85 6.64799 9 8.99999 9C11.352 9 13.373 9.85 14.863 11.44C16.34 13.02 17.229 15.24 17.495 17.9L17.605 19H0.394989L0.504989 17.9C0.770989 15.24 1.65999 13.02 3.13699 11.44ZM8.99999 2C7.89499 2 6.99999 2.9 6.99999 4C6.99999 5.1 7.89499 6 8.99999 6C10.105 6 11 5.1 11 4C11 2.9 10.105 2 8.99999 2ZM4.99999 4C4.99999 1.79 6.79099 0 8.99999 0C11.209 0 13 1.79 13 4C13 6.21 11.209 8 8.99999 8C6.79099 8 4.99999 6.21 4.99999 4Z";

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="icon" d={d} />
    </svg>
  );
}

export default Profile;
