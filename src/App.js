import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);

  const [textArea, setTextArea] = useState();

  const [button, setButton] = useState(false);

  const [idEdit, setIdEdit] = useState();

  useEffect(() => {
    const getData = localStorage.getItem("myData");

    setTodo(JSON.parse(getData));
  }, []);

  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(todo));
  }, [todo]);

  const checkBoxHandler = (id) => {
    setTodo(
      todo.map((items) => {
        if (items.id === id) {
          if (!items.checkbox) {
            items.checkbox = true;
          } else {
            items.checkbox = false;
          }
        }
        return items;
      })
    );
  };

  const onInputHandler = (event) => {
    setTextArea(event.target.value);
  };

  const onSubmit = () => {
    setTodo([{ id: uuidv4(), value: textArea, checkbox: false }, ...todo]);
    setTextArea("");
  };

  const onDelete = (id) => {
    setTodo(todo.filter((items) => items.id !== id));
  };

  const onEdit = (id) => {
    const findEdit = todo.find((items) => {
      return items.id === id;
    });
    setButton(true);
    setIdEdit(id);
    setTextArea(findEdit.value);
  };

  const onConfirmEdit = () => {
    const findConfirmEdit = todo.map((items) => {
      if (items.id === idEdit) {
        items.value = textArea;
      }
      return items;
    });
    setTodo(findConfirmEdit);

    setTextArea("");
    setButton(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (button) {
        onConfirmEdit();
      } else {
        onSubmit();
      }
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="board">
          <div className="input">
            <input
              className="inputArea"
              name="list"
              onInput={onInputHandler}
              value={textArea}
              onKeyPress={handleKeyPress}
              maxLength="40"
            />

            {button ? (
              <button className="button" onClick={onConfirmEdit}>
                OK!
              </button>
            ) : (
              <button className="button" onClick={onSubmit}>
                ADD
              </button>
            )}
          </div>
          {todo.map((value) => (
            <div className="list" key={value.id}>
              <div className="list_text">
                {" "}
                <input
                  className="checkbox"
                  type="checkbox"
                  onClick={() => checkBoxHandler(value.id)}
                  checked={value.checkbox}
                />
                {value.value}
              </div>
              <div className="action">
                <button
                  className="button__edit"
                  name={value.value}
                  onClick={() => onEdit(value.id)}
                >
                  EDIT
                </button>
                <button
                  className="button__delete"
                  name={value.value}
                  onClick={() => onDelete(value.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
