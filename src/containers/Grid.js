import React, { Component } from 'react';

class Grid extends Component {
    render() {
        return (
            <main>
                <div className="album py-5 bg-body-tertiary m-4">
                    <div className="container-fluid">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </main>
        );
    }
};

export default Grid;