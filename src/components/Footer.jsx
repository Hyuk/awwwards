import React from "react";
import { FaDiscord, FaTwitter, FaGithub, FaTwitch } from "react-icons/fa";

const Links = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://github.com", icon: <FaGithub /> },
  { href: "https://twitch.com", icon: <FaTwitch /> },
];

export default function Footer() {
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between md:px-8 w-screen bg-violet-300 py-4 text-black">
      <p className="text-center text-sm md:text-left">
        &copy; Nova 2024. All rights reserved
      </p>

      <div className="flex justify-center gap-4 md:justify-start">
        {Links.map((link) => (
          <a
            href={link.href}
            key={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black duration-500 ease-in-out hover:text-white"
          >
            {link.icon}
          </a>
        ))}
      </div>
      <a
        href="#privacy-policy"
        className="text-center text-sm hover:underline md:text-right"
      >
        Privacy Policy
      </a>
    </div>
  );
}
