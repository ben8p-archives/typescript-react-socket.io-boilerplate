import * as React from "react";

export interface HelloProps { name: string; lastname: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Hello from {this.props.name} , {this.props.lastname}!</h1>;
    }
}
