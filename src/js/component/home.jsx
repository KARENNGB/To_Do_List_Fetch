//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState({"label":"","done":false});
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/karenngb"
    );
    const data = await response.json();
    setTodos(data);
  };

  const updateTodos = async () => {
    const response = await fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/karenngb" , {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
         todos.concat([inputValue])
        )
      }
    );
    if (response.ok) {
      getTodos()
    }
  };

  return (
    <div className="container">
      <h1>My List</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue({"label":e.target.value,"done":false})}
            value={inputValue.label}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTodos()
              }
            }}
            placeholder="What do you need to do?"
          ></input>
        </li>
        {todos.map((item, index) => (
          <li>
            {item.label}
            <i
              class="fa-solid fa-trash-can"
              onClick={() =>
                setTodos(
                  todos.filter((t, currentIndex) => index != currentIndex)
                )
              }
            ></i>
          </li>
        ))}
      </ul>
      <div>{todos.length} Task</div>
    </div>
  );
};

export default Home;
