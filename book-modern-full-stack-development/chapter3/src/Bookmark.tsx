// Copyright (C) 2022 Varghese Mathew (Matt)

import React from "react";

interface IProps {
    title: string;
    href: string;
    description: string;
}
interface IState {
    title: string;
}

class Bookmark extends React.Component<IProps, IState> {

    // The explicit override of state is not required 
    // As we passed the state type in the template
    // public override state:IState;

    constructor(props: IProps) {
        super(props);
        this.state = { title: props.title };

        // Ref: https://stackoverflow.com/questions/70634283/react-typescript-uncaught-typeerror-this-is-undefined
        // when you define your function as NOT an arrow function you generally need to bind it
        // this.buttonOnClickEvent = this.buttonOnClickEvent.bind(this);
    }

    /* This below won't be bound, unless we add the binding line in the constructor. 
     * Same problem doesn't exist if it is defined as an arrow function !
    private buttonOnClickEvent(): void {
        const newState: IState = { title: this.state.title + "-CHANGED" };
        this.setState(newState);
    }
    */

    // Since buttonOnClickEvent is defined as an arrow function, we don't need to bind it.
    // See https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/ for
    // differences between regular and arrow functions.
    private buttonOnClickEvent: React.MouseEventHandler<HTMLButtonElement> = () =>  {
        const newState: IState = { title: this.state.title + "-CHANGED" };
        this.setState(newState);
    }

    public override render(): React.ReactNode {
        return (
            <li>
                <h2 className="bookmarkTitle">{this.state.title}</h2>
                <a href={this.props.href}>{this.props.description}</a>
                <button onClick={this.buttonOnClickEvent}>Change Title</button>
            </li>
        );
    }
}

export default Bookmark;
