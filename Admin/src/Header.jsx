import React from 'react';

const Header = () => {
  return (
    <header style={{ borderBottom: '1px solid #ccc' }}> {/* Inline style for border */}
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img
            src="https://www.lotteria.vn/grs-static/images/lotteria_logo.png"
            alt="Lotteria Logo"
            style={{ height: '50px' }}
          />
        </a>
        <button className="btn btn-danger ml-auto">Logout</button>
      </div>
    </header>
  );
};

export default Header;
