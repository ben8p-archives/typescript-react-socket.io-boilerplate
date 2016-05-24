import * as React from "react";
import * as promise from "promise";

import "./styles/Hello.less";

export interface HelloProps { name: string; lastname: string; }

interface HelloState {
    question: string;
}

export class Hello extends React.Component<HelloProps, {}> {
    state: HelloState;

    constructor() {
      super();
      this.state = this.getInitialState();
    }

     getInitialState():HelloState {
        return {question: ""};
    }

    componentDidMount() {
      let promise: Promise.IThenable<Boolean> = new Promise(function(resolve: (value: Boolean) => void, reject: (reason: Boolean) => void) {
          setTimeout(function() {
            resolve(true);
          }, 2500);
      });
      promise.then((value: Boolean) => {
          this.setState({question: "And you ?"});
      });
    }

    render() {
        return <h1>Hello I am {this.props.name} {this.props.lastname}! {this.state.question}</h1>;
    }
}
