import React from "react";

class ObjectComponent extends React.Component {
    render() {
        console.log(this.props);
        let { user_presentation, ...rest } = this.props;
        return (
            <div className="object">
                <h1>
                    <a href={`/${this.props._id}`}>Scan {this.props._id}</a>
                </h1>
                <GenericTable data={rest} />
                <UserPresentation
                    description={user_presentation.description}
                    data={user_presentation.data}
                />
            </div>
        );
    }
}

function GenericTable(props) {
    return (
        <table>
            <tbody>
                {Object.entries(props.data).map(([key, value]) => {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function UserPresentation(props) {
    return (
        <div className="user-presentation">
            <div className="header">Scanner-unique data</div>
            {props.description && (
                <div className="description">{props.description}</div>
            )}
            <table>
                <tbody>
                    {Object.entries(props.data).map(
                        ([key, { data, display_name, description }]) => {
                            return (
                                <tr key={key}>
                                    <td>{display_name}</td>
                                    {description && (
                                        <td className="description">
                                            {description}
                                        </td>
                                    )}
                                    <td>{data.toString()}</td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ObjectComponent;
