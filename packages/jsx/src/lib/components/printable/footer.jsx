import React from "react";
import {Container} from "react-materialize";

export const PrintableFooter = ({children}) => {
    return <footer id="footer" className="printable-footer">
        <Container>
            {children}
        </Container>
    </footer>;
};

export default PrintableFooter;
