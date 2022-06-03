import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

import dateFormat from "dateformat";

import { resultClassName } from "../util";

function ListItem(props) {
    return (
        <tr
            className="list-item"
            variant="outlined"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "1em",
                paddingBottom: "1em"
            }}
            onClick={() => (window.location = `/${props._id}`)}
        >
            <td>{dateFormat(props.timestamp, "isoUtcDateTime")}</td>
            <td>
                {props.ip}:{props.port}
            </td>
            <td>{props.domain}</td>
            <td>{props.display_name}</td>
            <td style={{ paddingRight: 0 }}>
                <Card
                    className={resultClassName(props.result)}
                    variant="outlined"
                >
                    {props.result.display_name}
                </Card>
            </td>
            <td style={{ paddingLeft: 0 }}>
                <Card className="reliability" variant="outlined">
                    {props.result.reliability}
                </Card>
            </td>
            <td>
                <Button variant="contained">Re-scan</Button>
            </td>
        </tr>
    );
}

export default ListItem;
