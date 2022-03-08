import React, { Fragment, useState } from "react";
import socket from "./socket";
import "./App.css";

function Message({ name, message }) {
  return (
    <tr>
      <td>
        <b>{name}</b>
      </td>
      <td>{message}</td>
    </tr>
  );
}

function App() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [messages, setMessages] = useState([
    { name: "User Name", message: "Message" },
  ]);

  const sendMessage = () => {
    socket.emit("message", { from: formData.name, message: formData.message });
    setFormData({ ...formData, message: "" });
  };

  socket.on("message", (data) => {
    setMessages([...messages, { name: data.from, message: data.message }]);
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <div>
        <div
          className="container"
          style={{
            paddingTop: "16px",
          }}
        >
          <div className="form-group">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Enter your Name"
              className="form-control"
              value={formData.name}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message: </label>

            <input
              type="text"
              name="message"
              id="message"
              placeholder="Send your message boss"
              className="form-control"
              value={formData.message}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button className="btn btn-primary" onClick={sendMessage}>
            SEND
          </button>
          <h4
            style={{
              textAlign: "center",
              padding: "16px",
            }}
          >
            Welcome to house of sounds chatroom
          </h4>
          <table className="table table-hover">
            <tbody className="center">
              {messages.map((msg) => (
                <Message name={msg.name} message={msg.message} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
