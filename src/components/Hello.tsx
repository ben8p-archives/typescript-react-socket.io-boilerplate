import * as React from 'react';
import 'promise';

import './styles/Hello.less';

export interface HelloProps { name: string; lastname: string; }

interface HelloState {
    question: string;
}

export class Hello extends React.Component<HelloProps, {}> {
    public state: HelloState;

    constructor() {
      super();
      this.state = this.getInitialState();
    }

     public getInitialState(): HelloState {
        return {question: ''};
    }

    public componentDidMount(): void {
        let promise: Promise.IThenable<Boolean> = new Promise(function(resolve: (value: Boolean) => void, reject: (reason: Boolean) => void): void {
            setTimeout(function(): void {
                resolve(true);
            }, 2500);
        });
        promise.then((value: Boolean) => {
            this.setState({question: 'And you ?'});
        });
    }

    public render(): JSX.Element {
        return <h1>Hello I am {this.props.name} {this.props.lastname}! {this.state.question}</h1>;
    }
}
