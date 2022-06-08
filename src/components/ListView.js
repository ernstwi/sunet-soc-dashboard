import React, { useEffect, useState } from "react";

import Pagination from "@mui/material/Pagination";

import ListItem from "./ListItem";
import SearchForm from "./SearchForm";

function ListView(props) {
    let [scans, setScans] = useState([]);
    let [filter, setFilter] = useState({ field: null, value: null });
    let [page, setPage] = useState(1);
    let [totalPages, setTotalPages] = useState(1);

    useEffect(getData, [filter]);

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, [page]);

    function getData() {
        function filterString() {
            return filter.field == null || filter.value == null
                ? null
                : filter.field + "=" + filter.value;
        }

        function queryString() {
            return [
                `limit=${window.injectedEnv.PER_PAGE}`,
                `skip=${(page - 1) * window.injectedEnv.PER_PAGE}`,
                filterString()
            ]
                .filter(x => x !== null)
                .join("&");
        }

        fetch(
            window.injectedEnv.COLLECTOR_URL + "/sc/v0/get?" + queryString(),
            {
                headers: {
                    Authorization: "Bearer " + props.token
                }
            }
        )
            .then(resp => {
                if (resp.status !== 200)
                    throw new Error(
                        `Unexpected HTTP response code from soc_collector: ${resp.status} ${resp.statusText}`
                    );
                setTotalPages(parseInt(resp.headers.get("X-Total-Count")));
                return resp.json();
            })
            .then(json => {
                setScans(
                    json.docs.map(d => ({
                        ...d,
                        timestamp: new Date(d.timestamp)
                    }))
                );
            })
            .catch(e => props.setError(e.toString()));
    }

    return (
        <div id="list-container">
            <div id="controls">
                <SearchForm
                    filter={(field, value) => {
                        setFilter({ field: field, value: value });
                        setPage(1);
                    }}
                />
            </div>
            <table id="main">
                <tbody>
                    {scans
                        .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
                        .map(scan =>
                            Object.entries(scan.result)
                                .filter(
                                    ([_, res]) =>
                                        res.vulnerable ||
                                        res.investigation_needed
                                )
                                .map(([id, res]) => (
                                    <ListItem
                                        key={scan._id + id}
                                        {...scan}
                                        result={res}
                                    />
                                ))
                        )
                        .flat()}
                </tbody>
            </table>
            <div id="pagination">
                <Pagination
                    page={page}
                    count={totalPages}
                    onChange={(e, v) => setPage(v)}
                    variant="outlined"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    );
}

export default ListView;
