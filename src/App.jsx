import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CreatePost from "./components/CreatePost";
import Postlist from "./components/Postlist";
import { useState } from "react";
import PostlistProvider from "./store/Post-list-store";

function App() { 
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostlistProvider>
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="content">
          <Header />
          {selectedTab === "Home" ? (
            <Postlist />
          ) : (
            <CreatePost onPostCreated={() => setSelectedTab("Home")} />
          )}
          <Footer />
        </div>
      </div>
    </PostlistProvider>
  );
};

export default App;