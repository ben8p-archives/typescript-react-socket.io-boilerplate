import * as React from "react";

import "./styles/Hello.less";

export interface HelloProps { name: string; lastname: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello I am {this.props.name}, {this.props.lastname}!</h1>;
    }
}
