import PropTypes from "prop-types";
import React from "react";
import {Col} from "react-materialize";
import SectionWrapper from "./sectionWrapper";

export const RightPushSection = ({printableType, type, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className, children, sideContent}) => {
    const sectionClassNames = [
        "printable-section--push",
        "printable-section--push-right"
    ];

    return <SectionWrapper {...{
        printableType,
        type,
        hideOnPrint,
        showOnLetter,
        showOnA4,
        showOnLegal,
        hideOnScreen,
        verticallyAlignContent,
        className: sectionClassNames.concat(className).join(" ").trim()
    }}>
        <aside className="col m3 printable-section__header hide-on-small-only">
            {sideContent}
        </aside>
        <Col m={9} className="printable-section__content">
            {children}
        </Col>
    </SectionWrapper>;
};

RightPushSection.propTypes = {
    className: PropTypes.string,
    sideContent: PropTypes.node,
    printableType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

RightPushSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default RightPushSection;
