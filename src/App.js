import logo from "./logo.svg";
import { app, app_logo, app_header, app_link } from "./App.module.scss";

const App = () => {
  return (
    <div className={app}>
      {/* Modify this section from here */}
      <header className={app_header}>
        <img src={logo} className={app_logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to see the magic.
        </p>
        <a
          className={app_link}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* all the way to here */}
    </div>
  );
};

export default App;
