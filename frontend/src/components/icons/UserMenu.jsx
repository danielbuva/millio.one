import { Link } from "react-router-dom";

function UserMenu() {
  return (
    <Link to="/you">
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="user-menu"
      >
        <circle cx="26" cy="26" r="26" fill="#ffffff" />
        <path
          d="M38.3754 44.0873C34.8321 46.5214 30.5411 47.9458 25.9173 47.9458C21.2935 47.9458 17.0026 46.5212 13.4592 44.0871C11.8942 43.0121 11.2254 40.9644 12.1353 39.2979C14.0216 35.8433 17.9083 33.6917 25.9173 33.6917C33.9263 33.6917 37.813 35.8435 39.6992 39.2979C40.6092 40.9644 39.9403 43.0123 38.3754 44.0873Z"
          fill="#000000"
        />
        <path
          d="M25.9172 25.9166C30.2114 25.9166 33.6922 22.4358 33.6922 18.1416C33.6922 13.8476 30.2114 10.3666 25.9172 10.3666C21.6234 10.3666 18.1423 13.8476 18.1423 18.1416C18.1423 22.4358 21.6234 25.9166 25.9172 25.9166Z"
          fill="#000000"
        />
      </svg>
    </Link>
  );
}

export default UserMenu;