 const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Social<span>.</span></div>
      <ul className="sidebar-nav">
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); setSelectedTab("Home"); }} className={selectedTab === "Home" ? "active" : ""}>
            <span className="nav-icon">🏠</span> Home
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); setSelectedTab("Create Post"); }} className={selectedTab === "Create Post" ? "active" : ""}>
            <span className="nav-icon">✏️</span> Create Post
          </a>
        </li>
        <li><a href="#"><span className="nav-icon">🔔</span> Notifications</a></li>
        <li><a href="#"><span className="nav-icon">🔖</span> Saved</a></li>
        <li><a href="#"><span className="nav-icon">⚙️</span> Settings</a></li>
      </ul>
      <div className="sidebar-user">
       <img
  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pratik"
  alt="user"
  className="sidebar-avatar"
/>
        <div>
          <div className="sidebar-username">Pratik</div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>@pratiktomar</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;