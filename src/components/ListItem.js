import React from "react";

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
                <td>
                    <Card
                        className={
                            "cve" + (this.props.vulnerable ? " vulnerable" : "")
                        }
                        variant="outlined"
                    >
                        {this.props.cve}
                    </Card>
                </td>
            </tr>
        );
    }
}

export default ListItem;
