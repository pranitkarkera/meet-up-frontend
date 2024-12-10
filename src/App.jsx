import React,{useState} from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Select Event Type");

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <hr/>
      <HomePage
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default App;