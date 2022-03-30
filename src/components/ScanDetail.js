import React from "react";

import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";

class ScanDetail extends React.Component {
    render() {
        return (
            <Card className="scan-detail" variant="outlined">
                <div className="id">
                    <a href={`/${this.props._id}`}>#{this.props._id}</a>
                </div>
                <h2>General info</h2>

                <table>
                    <tbody>
                        <tr>
                            <td>Domain</td>
                            <td>{this.props.domain}</td>
                        </tr>
                        <tr>
                            <td>Endpoint</td>
                            <td>{`${this.props.ip}:${this.props.port}`}</td>
                        </tr>
                        <tr>
                            <td>Hostname</td>
                            <td>{this.props.ptr}</td>
                        </tr>
                        <tr>
                            <td>Owner</td>
                            <td>{this.props.whois_description}</td>
                        </tr>
                        <tr>
                            <td>ASN</td>
                            <td>{`${this.props.asn} (${this.props.asn_country_code})`}</td>
                        </tr>
                        <tr>
                            <td>Abuse mail</td>
                            <td>{this.props.abuse_mail}</td>
                        </tr>
                    </tbody>
                </table>

                {this.props.description && (
                    <>
                        <br />
                        <Alert severity="info">{this.props.description}</Alert>
                    </>
                )}

                <h2>Custom info</h2>
                <Custom {...this.props.custom_data} />

                <h2>Latest scan | {this.props.timestamp_in_utc}</h2>
                <div id="cves">
                    {this.props.result
                        .sort((a, b) => (a.vulnerable ? -1 : 1))
                        .map(cve => (
                            <CVE {...cve} />
                        ))}
                </div>
            </Card>
        );
    }
}

function Custom(props) {
    return (
        <table>
            <tbody>
                {Object.entries(props).map(
                    ([key, { data, display_name, description }]) => (
                        <CustomElement
                            key={key}
                            data={data}
                            display_name={display_name}
                            description={description}
                        />
                    )
                )}
            </tbody>
        </table>
    );
}

function CustomElement(props) {
    return (
        <tr>
            <td>{props.display_name}</td>
            <td>{props.data.toString()}</td>
            <td style={{ fontStyle: "italic" }}>{props.description}</td>
        </tr>
    );
}

function CVE(props) {
    return (
        <Card
            className={"cve" + (props.vulnerable ? " vulnerable" : "")}
            variant="outlined"
        >
            {props.cve}
        </Card>
    );
}

export default ScanDetail;
