import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import dateFormat from "dateformat";

import { resultClassName } from "../util";

function ScanView(props) {
    let [rescanInProgress, setRescanInProgress] = useState(false);
    let [data, setData] = useState(null);
    let [timestamp, setTimestamp] = useState(null);

    useEffect(getData, []);

    function getData() {
        fetch(`${window.injectedEnv.COLLECTOR_URL}/sc/v0/get/${props.id}`, {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
            .then(resp => {
                if (resp.status !== 200)
                    throw new Error(
                        `Unexpected HTTP response code from soc_collector: ${resp.status} ${resp.statusText}`
                    );
                return resp.json();
            })
            .then(json => {
                setData(json.docs);
                setTimestamp(new Date(json.docs.timestamp));
            })
            .catch(e => props.setError(e.toString()));
    }

    // TODO: Trigger a real re-scan
    function rescan() {
        setRescanInProgress(true);
        setTimeout(() => {
            setRescanInProgress(false);
            setTimestamp(Date.now());
        }, 2000);
    }

    if (data === null) return null;
    else {
        return (
            <Card className="scan-detail" variant="outlined">
                <div className="id">
                    <a href={`/${data._id}`}>#{data._id}</a>
                </div>
                <h2>General info</h2>

                <table>
                    <tbody>
                        <tr>
                            <td>Domain</td>
                            <td>{data.domain}</td>
                        </tr>
                        <tr>
                            <td>Endpoint</td>
                            <td>{`${data.ip}:${data.port}`}</td>
                        </tr>
                        <tr>
                            <td>Hostname</td>
                            <td>{data.ptr}</td>
                        </tr>
                        <tr>
                            <td>Owner</td>
                            <td>{data.whois_description}</td>
                        </tr>
                        <tr>
                            <td>ASN</td>
                            <td>{`${data.asn} (${data.asn_country_code})`}</td>
                        </tr>
                        <tr>
                            <td>Abuse mail</td>
                            <td>{data.abuse_mail}</td>
                        </tr>
                    </tbody>
                </table>

                {data.description && (
                    <>
                        <br />
                        <Alert severity="info">{data.description}</Alert>
                    </>
                )}

                <h2>Custom info</h2>
                <Custom {...data.custom_data} />

                <h2
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <div>
                        Latest scan: &nbsp;&nbsp;&nbsp;
                        {dateFormat(timestamp, "isoUtcDateTime")}
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
                        {rescanInProgress ? (
                            <CircularProgress size="37px" />
                        ) : (
                            <Button variant="contained" onClick={rescan}>
                                Re-scan
                            </Button>
                        )}
                    </div>
                </h2>

                <div id="results">
                    {Object.entries(data.result)
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
