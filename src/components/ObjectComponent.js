import React from "react";

import Card from "@mui/material/Card";

class ObjectComponent extends React.Component {
    render() {
        let {
            _id,
            _rev,
            document_version,
            user_presentation,
            ip,
            port,
            whois_description,
            asn,
            asn_country_code,
            ...rest
        } = this.props;
        return (
            <Card className="object" variant="outlined">
                <div className="id">
                    <a href={`/${_id}`}>#{_id}</a>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>Address</td>
                            <td>{`${ip}:${port}`}</td>
                        </tr>
                        <tr>
                            <td>Owner</td>
                            <td>{whois_description}</td>
                        </tr>
                        <tr>
                            <td>ASN</td>
                            <td>{`${asn} (${asn_country_code})`}</td>
                        </tr>
                    </tbody>
                </table>

                {/* TODO */}
                {/* <GenericTable data={rest} /> */}

                <UserPresentation
                    description={user_presentation.description}
                    data={user_presentation.data}
                />
            </Card>
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
            <hr />
            {props.description && (
                <div className="description">{props.description}</div>
            )}
            <table>
                <tbody>
                    {Object.entries(props.data).map(
                        ([key, { data, display_name, description }]) => {
                            return (
                                <React.Fragment key={key}>
                                    <tr>
                                        <td>{display_name}</td>
                                        <td>{data.toString()}</td>
                                    </tr>
                                    {description && (
                                        <tr className="description">
                                            <td colSpan="2">{description}</td>
                                        </tr>
                                    )}
                                    <tr className="spacer"></tr>
                                </React.Fragment>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ObjectComponent;
