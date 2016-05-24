import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import "./styles/index.less";

ReactDOM.render(
    <Hello name="foo" lastname="bar" />,
    document.getElementById("example")
);
