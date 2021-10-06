import React from "react";
import PropTypes from "prop-types";
import { Button, Select, Input, Icon } from "semantic-ui-react";

class SearchForm extends React.Component {
    static propTypes = {
        filter: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            field: "default-field",
            value: ""
        };

        this.clearSearch = this.clearSearch.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
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
                key: "default-field",
                value: "default-field",
                text: "Default field"
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
                        defaultValue="default-field"
                        onChange={this.handleInput}
                    />
                    <Button type="submit">Search</Button>
                </Input>
            </form>
        );
    }
}

export default SearchForm;
