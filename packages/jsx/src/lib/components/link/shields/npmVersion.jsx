import PropTypes from "prop-types";
import React from "react";
import {CampaignLink} from "../campaign";

export const NpmVersionShield = ({packageName} = {}) => <CampaignLink
    className="shield"
    href={`https://www.npmjs.com/package/${packageName}`}
    aria-label={`${packageName} version`}
    name={`${packageName} version`}>
    <img
        className="shield__image"
        src={`https://img.shields.io/npm/v/${packageName}.svg?style=flat-square`}
    />
</CampaignLink>;

NpmVersionShield.propTypes = {
    packageName: PropTypes.string.isRequired
};

export const ResumeNpmVersionShield = () => NpmVersionShield({packageName: __RESUME_PACKAGE_NAME__});

export const LetterNpmVersionShield = () => NpmVersionShield({packageName: __LETTER_PACKAGE_NAME__});

export default NpmVersionShield;
