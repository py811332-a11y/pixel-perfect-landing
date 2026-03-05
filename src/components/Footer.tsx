const Footer = () => {
  return (
    <footer className="px-6 md:px-16 py-16 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="text-sm font-semibold tracking-[0.2em] uppercase">ISI Global</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Elevating brand experiences across retail worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-xs text-muted-foreground mb-4">Expertise</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:opacity-60 transition-opacity">Define</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Design</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Digital</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Develop</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Deliver</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-xs text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:opacity-60 transition-opacity">About</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Projects</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Careers</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold tracking-wider uppercase text-xs text-muted-foreground mb-4">Connect</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:opacity-60 transition-opacity">LinkedIn</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between text-xs text-muted-foreground">
        <span>© 2024 ISI Global. All rights reserved.</span>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:opacity-60 transition-opacity">Privacy Policy</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
