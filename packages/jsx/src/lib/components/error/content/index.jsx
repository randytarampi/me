import {ErrorENOACCESSContentComponent} from "./enoaccess";
import {ErrorENOCONTENTContentComponent} from "./enocontent";
import {ErrorENOTFOUNDContentComponent} from "./enotfound";
import {ErrorESERVERContentComponent} from "./eserver";

export * from "./enoaccess";
export * from "./enocontent";
export * from "./enotfound";
export * from "./eserver";

export const errorContents = {
    ESERVER: ErrorESERVERContentComponent,
    ENOTFOUND: ErrorENOTFOUNDContentComponent,
    ENOACCESS: ErrorENOACCESSContentComponent,
    ENOCONTENT: ErrorENOCONTENTContentComponent
};

export const mapErrorCodeToErrorContentComponent = errorCode => {
    switch (errorCode) {
        case 500:
            return ErrorESERVERContentComponent;

        case 404:
            return ErrorENOTFOUNDContentComponent;

        case 403:
            return ErrorENOACCESSContentComponent;
    }
};

export default errorContents;
