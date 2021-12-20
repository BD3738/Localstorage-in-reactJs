import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [data, setData] = useState([]);
  const [ids, setIds] = useState("");
  const [tog, setTog] = useState(false);

  const submit = () => {
    setData([...data, { name, job }]);
    setName("");
    setJob("");
  };

  useEffect(() => {
    const dt = localStorage.getItem("Name");
    if (dt) {
      setData(JSON.parse(dt));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Name", JSON.stringify(data));
  }, [data]);

  const removeItem = (id) => {
    let dt = data.filter((item, i) => {
      if (i !== id) {
        return item;
      }
    });
    setData(dt);
  };

  const editItem = (id) => {
    const dt = data.find((data, i) => i === id);
    setName(dt.name);
    setJob(dt.job);
    setIds(id);
    setTog(true);
  };
  const fEdit = () => {
    if (tog === false) {
      let dt = { name, job };
      setData(dt);
    } else {
      data[ids].name = name;
      data[ids].job = job;
      setName("");
      setJob("");

      console.log("editdata", data);
      setTog(false);
    }
  };

  return (
    <div className="App">
      <h1>CRUD Local storage</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        typoe="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />
      {tog ? <button onClick={()=>fEdit()}>Edit</button> : <button onClick={()=>submit()}>clickme</button>}
        
      {
        data.map((data, i) => {
          return (
            <div key={i}>
              <h3>{data.name}</h3>
              <h3>{data.job}</h3>
              <button onClick={() => removeItem(i)}>Remove</button>
              <button onClick={() => editItem(i)}>Edit</button>
            </div>
          );
          
        })
      }


    </div>
  );
}

export default App;
