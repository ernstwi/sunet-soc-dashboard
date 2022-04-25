export function resultClassName(props) {
    if (props.vulnerable) return "result vulnerable";
    else if (props.investigation_needed) return "result investigation_needed";
    else return "result";
}
