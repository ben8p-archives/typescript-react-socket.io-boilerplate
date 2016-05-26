import * as React from 'react';
import * as io from 'socket.io-client';
import 'promise';

import './styles/Hello.less';

export interface HelloProps { name: string; lastname: string; }

interface HelloState {
    question: string;
    name: string;
}

const EVENT_SERVER_NAME: string = 'serverName';

export class Hello extends React.Component<HelloProps, {}> {
    public state: HelloState;
    private socket: SocketIOClient.Socket;

    constructor() {
        super();
        this.state = this.getInitialState();

        this.socket = io();
        this.socket.on(EVENT_SERVER_NAME, (event: any): void => {
            this.setState({name: 'Server name is: ' + event.name});
        });
    }

     public getInitialState(): HelloState {
        return {name: '', question: ''};
    }

    public componentDidMount(): void {
        let promise: Promise.IThenable<Boolean> = new Promise(function(resolve: (value: Boolean) => void, reject: (reason: Boolean) => void): void {
            setTimeout(function(): void {
                resolve(true);
            }, 2500);
        });
        promise.then((value: Boolean) => {
            this.setState({question: 'And you ?'});
            this.socket.emit(EVENT_SERVER_NAME);
        });
    }

    public render(): JSX.Element {
        return <h1>Hello I am {this.props.name} {this.props.lastname}! {this.state.question} {this.state.name}</h1>;
    }
}
