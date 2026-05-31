const Header = () => {
  return (
    <header className="app-header">
      <div className="header-title">✦ Social</div>
      <div className="header-search">
        <span>🔍</span>
        <input type="text" placeholder="Search posts..." />
      </div>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6c63ff, #ff6584)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'white',
          cursor: 'pointer'
        }}
      >PT</div>
    </header>
  );
};

export default Header;