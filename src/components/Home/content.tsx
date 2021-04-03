import BookIcon from "../icons/BookIcon";
import ChatIcon from "../icons/ChatIcon";
import ClockIcon from "../icons/ClockIcon";
import WorkIcon from "../icons/WorkIcon";

const content = {
  features: [
    {
      icon: <BookIcon />,
      header: "Share files",
      text: "Keep files and the messages about them together in channels.",
    },
    {
      icon: <WorkIcon />,
      header: "Collaborate with partners",
      text:
        "Work faster with external clients, vendors and more by working in a channel.",
    },
    {
      icon: <ChatIcon />,
      header: "Store messages",
      text: "We are storing your messages,you can always access them.",
    },
    {
      icon: <ClockIcon />,
      header: "Realtime",
      text: "You can chat with your friends realtime",
    },
  ],
  footer: [
    { href: "#", text: "Home" },
    { href: "/register", text: "Register" },
    { href: "/login", text: "Login" },
    { href: "/", text: "FAQ" },
    { href: "/", text: "Privacy Policy" },
    { href: "/", text: "Contact" },
  ],
  navbar: [
    {
      to: "#about",
      text: "About",
    },
    {
      to: "#services",
      text: "Services",
    },
    {
      to: "#discover",
      text: "Discover",
    },
    {
      to: "#getstarted",
      text: "Get started",
    },
  ],
};

export default content;
