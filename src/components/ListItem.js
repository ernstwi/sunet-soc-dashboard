import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

class ListItem extends React.Component {
    render() {
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
                onClick={() => (window.location = `/${this.props._id}`)}
            >
                <td>{this.props.timestamp_in_utc}</td>
                <td>
                    {this.props.ip}:{this.props.port}
                </td>
                <td>{this.props.domain}</td>
                <td>{this.props.system_name}</td>
                <td style={{ paddingRight: 0 }}>
                    <Card
                        className={
                            "result" +
                            (() => {
                                if (this.props.vulnerable) return " vulnerable";
                                else if (this.props.investigation_needed)
                                    return " investigation_needed";
                                else return "";
                            })()
                        }
                        variant="outlined"
                    >
                        {this.props.display_name}
                    </Card>
                </td>
                <td style={{ paddingLeft: 0 }}>
                    <Card className="reliability" variant="outlined">
                        {this.props.reliability}
                    </Card>
                </td>
                <td>
                    <Button variant="contained">Re-scan</Button>
                </td>
            </tr>
        );
    }
}

export default ListItem;
