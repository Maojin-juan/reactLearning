import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 py-6 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="text-sm text-gray-400">
          Copyright © {new Date().getFullYear()} 毛巾 Maojin
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/Maojin-juan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
