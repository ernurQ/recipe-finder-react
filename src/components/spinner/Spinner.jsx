import {Spinner as BootstrapSpinner} from "react-bootstrap";

const Spinner = () => (
    <BootstrapSpinner animation="border" role="status" className={'d-block mx-auto'}>
        <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
)

export default Spinner