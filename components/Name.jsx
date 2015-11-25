import React from "react";

const Name = React.createClass({
    render: function () {
        return (
            <div className="name">{this.props.text}
            </div>);
    }
});

export default Name;