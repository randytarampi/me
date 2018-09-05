import PropTypes from "prop-types";
import React from "react";
import {Col} from "react-materialize";
import SectionWrapper from "./sectionWrapper";

export const RawHtmlLetterSection = ({printableType, type, rawHtml, hideOnPrint, showOnLetter, showOnA4, showOnLegal, hideOnScreen, verticallyAlignContent, className}) => {
    const sectionClassNames = [
        "printable-section__raw-html"
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
        <Col className="printable-section__content" dangerouslySetInnerHtml={{__html: rawHtml}}/>
    </SectionWrapper>;
};

RawHtmlLetterSection.propTypes = {
    className: PropTypes.string,
    rawHtml: PropTypes.string.isRequired,
    printableType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    hideOnPrint: PropTypes.bool,
    hideOnScreen: PropTypes.bool,
    showOnA4: PropTypes.bool,
    showOnLegal: PropTypes.bool,
    showOnLetter: PropTypes.bool,
    verticallyAlignContent: PropTypes.bool
};

RawHtmlLetterSection.defaultProps = {
    hideOnPrint: false,
    hideOnScreen: false,
    showOnA4: false,
    showOnLegal: false,
    showOnLetter: false,
    verticallyAlignContent: false
};

export default RawHtmlLetterSection;
