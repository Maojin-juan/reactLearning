const Footer = () => {
  return (
    <footer className="bg-slate-700 py-6 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
