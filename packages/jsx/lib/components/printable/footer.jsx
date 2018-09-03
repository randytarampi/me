import React from "react";

export const PrintableFooter = ({children}) => {
    return <footer id="footer" className="printable-footer">
        <div className="container">
            {children}
        </div>
    </footer>;
};

export default PrintableFooter;
