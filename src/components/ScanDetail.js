import React from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { resultClassName } from "../util";

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

                <h2
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <div>
                        Latest scan: &nbsp;&nbsp;&nbsp;
                        {this.props.timestamp_in_utc}
                    </div>
                    <div>
                        <Button variant="contained">Re-scan</Button>
                    </div>
                </h2>

                <div id="results">
                    {Object.entries(this.props.result)
                        // Sort by vulnerable, investigation_needed, reliability, name
                        .sort((a, b) =>
                            a[1].display_name > b[1].display_name ? -1 : 1
                        )
                        .sort((a, b) =>
                            a[1].reliability < b[1].reliability ? -1 : 1
                        )
                        .sort((a, b) =>
                            a[1].vulnerable || a[1].investigation_needed
                                ? -1
                                : 1
                        )
                        .sort((a, b) => (a[1].vulnerable ? -1 : 1))
                        .map(([id, res]) => (
                            <Result key={id} {...res} />
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

function Result(props) {
    return (
        <div className="resultContainer">
            <Card className={resultClassName(props)} variant="outlined">
                {props.display_name}
                {props.description && (
                    <Tooltip title={props.description}>
                        <InfoOutlinedIcon />
                    </Tooltip>
                )}
            </Card>
            {(props.vulnerable || props.investigation_needed) && (
                <Card className="reliability" variant="outlined">
                    {props.reliability}
                </Card>
            )}
        </div>
    );
}

export default ScanDetail;
