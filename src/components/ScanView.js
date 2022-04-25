import React from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import dateFormat from "dateformat";

import { resultClassName } from "../util";

class ScanView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            rescanInProgress: false
        };

        this.getData = this.getData.bind(this);
        this.rescan = this.rescan.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(
            `${window.injectedEnv.COLLECTOR_URL}/sc/v0/get/${this.props.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.props.token
                }
            }
        )
            .then(resp => {
                if (resp.status !== 200)
                    throw new Error(
                        `Unexpected HTTP response code from soc_collector: ${resp.status} ${resp.statusText}`
                    );
                return resp.json();
            })
            .then(json => {
                this.setState({
                    loaded: true,
                    ...json.docs,
                    timestamp_in_utc: new Date(
                        json.docs.timestamp_in_utc.replace(/ UTC$/, "Z")
                    )
                });
            })
            .catch(e => this.props.setError(e));
    }

    // TODO: Trigger a real re-scan
    rescan() {
        this.setState({ rescanInProgress: true });
        setTimeout(
            () =>
                this.setState(prevState => ({
                    rescanInProgress: false,
                    timestamp_in_utc: Date.now()
                })),
            2000
        );
    }

    render() {
        return this.state.loaded && (
            <Card className="scan-detail" variant="outlined">
                <div className="id">
                    <a href={`/${this.state._id}`}>#{this.state._id}</a>
                </div>
                <h2>General info</h2>

                <table>
                    <tbody>
                        <tr>
                            <td>Domain</td>
                            <td>{this.state.domain}</td>
                        </tr>
                        <tr>
                            <td>Endpoint</td>
                            <td>{`${this.state.ip}:${this.props.port}`}</td>
                        </tr>
                        <tr>
                            <td>Hostname</td>
                            <td>{this.state.ptr}</td>
                        </tr>
                        <tr>
                            <td>Owner</td>
                            <td>{this.state.whois_description}</td>
                        </tr>
                        <tr>
                            <td>ASN</td>
                            <td>{`${this.state.asn} (${this.props.asn_country_code})`}</td>
                        </tr>
                        <tr>
                            <td>Abuse mail</td>
                            <td>{this.state.abuse_mail}</td>
                        </tr>
                    </tbody>
                </table>

                {this.state.description && (
                    <>
                        <br />
                        <Alert severity="info">{this.state.description}</Alert>
                    </>
                )}

                <h2>Custom info</h2>
                <Custom {...this.state.custom_data} />

                <h2
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <div>
                        Latest scan: &nbsp;&nbsp;&nbsp;
                        {dateFormat(
                            this.state.timestamp_in_utc,
                            "isoUtcDateTime"
                        )}
                    </div>
                    <div
                        style={{
                            width: "93px",
                            height: "37px",
                            display: "flex",
                            flexDirection: "vertical",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        {this.state.rescanInProgress ? (
                            <CircularProgress size="37px" />
                        ) : (
                            <Button variant="contained" onClick={this.rescan}>
                                Re-scan
                            </Button>
                        )}
                    </div>
                </h2>

                <div id="results">
                    {Object.entries(this.state.result)
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

export default ScanView;
