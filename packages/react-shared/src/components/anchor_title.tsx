import * as React from 'react';
import { Link as ScrollLink } from 'react-scroll';

import { HeaderSizes, Styles } from '../types';
import { constants } from '../utils/constants';

const headerSizeToScrollOffset: { [headerSize: string]: number } = {
    h2: -20,
    h3: 0,
};

export interface AnchorTitleProps {
    title: string | React.ReactNode;
    id: string;
    headerSize: HeaderSizes;
    shouldShowAnchor: boolean;
}

export interface AnchorTitleState {
    isHovering: boolean;
}

const styles: Styles = {
    anchor: {
        fontSize: 20,
        transform: 'rotate(45deg)',
        cursor: 'pointer',
    },
    h1: {
        fontSize: '1.8em',
    },
    h2: {
        fontSize: '1.5em',
        fontWeight: 400,
    },
    h3: {
        fontSize: '1.17em',
    },
};

export class AnchorTitle extends React.Component<AnchorTitleProps, AnchorTitleState> {
    constructor(props: AnchorTitleProps) {
        super(props);
        this.state = {
            isHovering: false,
        };
    }
    public render(): React.ReactNode {
        let opacity = 0;
        if (this.props.shouldShowAnchor) {
            opacity = this.state.isHovering ? 0.6 : 1;
        }
        return (
            <div
                className="relative flex"
                style={
                    {
                        ...styles[this.props.headerSize],
                        fontWeight: 'bold',
                        display: 'block',
                        WebkitMarginStart: 0,
                        WebkitMarginEnd: 0,
                    } as any
                }
            >
                <div className="inline-block" style={{ paddingRight: 4 }}>
                    {this.props.title}
                </div>
                <ScrollLink
                    to={this.props.id}
                    hashSpy={true}
                    offset={headerSizeToScrollOffset[this.props.headerSize]}
                    duration={constants.DOCS_SCROLL_DURATION_MS}
                    containerId={constants.DOCS_CONTAINER_ID}
                >
                    <i
                        className="zmdi zmdi-link"
                        style={{ ...styles.anchor, opacity }}
                        onMouseOver={this._setHoverState.bind(this, true)}
                        onMouseOut={this._setHoverState.bind(this, false)}
                    />
                </ScrollLink>
            </div>
        );
    }
    private _setHoverState(isHovering: boolean): void {
        this.setState({
            isHovering,
        });
    }
}
