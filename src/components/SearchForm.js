import React from "react";
import PropTypes from "prop-types";
import { Button, Select, Input, Icon } from "semantic-ui-react";

class SearchForm extends React.Component {
    static propTypes = {
        filter: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        // NOTE: This state is for UI only, List state is used for requests.
        this.state = {
            field: "port",
            value: ""
        };

        this.clearSearch = this.clearSearch.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    handleInput(event, result) {
        this.setState({
            [result.name]: result.value
        });
    }

    clearSearch(_) {
        this.setState({ value: "" });
        this.props.filter(null, null);
    }

    submitSearch(e) {
        e.preventDefault();
        this.props.filter(this.state.field, this.state.value);
    }

    render() {
        const searchOptions = [
            {
                key: "port",
                value: "port",
                text: "Port"
            }
        ];
        return (
            <form onSubmit={this.submitSearch}>
                <Input
                    action
                    type="text"
                    name="value"
                    placeholder="Search..."
                    iconPosition="left"
                    onChange={this.handleInput}
                    value={this.state.value}
                >
                    <input />
                    <Icon name="delete" link onClick={this.clearSearch} />
                    <Select
                        name="field"
                        options={searchOptions}
                        defaultValue="port"
                        onChange={this.handleInput}
                    />
                    <Button type="submit">Search</Button>
                </Input>
            </form>
        );
    }
}

export default SearchForm;
