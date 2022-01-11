import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

class ObjectComponent extends React.Component {
    render() {
        return (
            <Card className="object" variant="outlined">
                <div className="id">
                    <a href={`/${this.props._id}`}>#{this.props._id}</a>
                </div>
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
                        <tr>
                            <td>Scan finished at</td>
                            <td>{this.props.timestamp_in_utc}</td>
                        </tr>
                    </tbody>
                </table>
                <Details {...this.props} />
            </Card>
        );
    }
}

function Details(props) {
    let content = (
        <>
            {props.user_presentation.description && (
                <Alert severity="info" sx={{ marginTop: "1em" }}>
                    {props.user_presentation.description}
                </Alert>
            )}
            <UserPresentation
                description={props.user_presentation.description}
                data={props.user_presentation.data}
            />
        </>
    );
    if (props.summary) {
        return (
            <div>
                <Accordion elevation={0} disableGutters={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon fontSize="small" />}
                    ></AccordionSummary>
                    <AccordionDetails>{content}</AccordionDetails>
                </Accordion>
            </div>
        );
    }
    return content;
}

function UserPresentation(props) {
    return (
        <div className="user-presentation" style={{ marginTop: "2em" }}>
            {Object.entries(props.data).map(
                ([key, { data, display_name, description }]) => (
                    <UserPresentationElement
                        key={key}
                        data={data}
                        display_name={display_name}
                        description={description}
                    />
                )
            )}
        </div>
    );
}

function UserPresentationElement(props) {
    return (
        <Card
            className="user-presentation-element"
            variant="outlined"
            sx={{ padding: "1em", marginTop: "1em" }}
        >
            <b>{props.display_name}</b>: {props.data.toString()}
            {props.description && (
                <Alert severity="info" sx={{ marginTop: "0.5em" }}>
                    {props.description}
                </Alert>
            )}
        </Card>
    );
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

export default ObjectComponent;
