import * as React from "react";
import * as ReactDOM from "react-dom";
import {Buffer} from "buffer"
import OptionsIndex from "./options-index";
window.Buffer = window.Buffer || Buffer;
var mountNode = document.getElementById("options");
ReactDOM.render(<OptionsIndex />, mountNode);
