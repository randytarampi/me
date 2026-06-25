import {ErrorENOACCESSContentComponent} from "./enoaccess.jsx";
import {ErrorENOCONTENTContentComponent} from "./enocontent.jsx";
import {ErrorENOTFOUNDContentComponent} from "./enotfound.jsx";
import {ErrorESERVERContentComponent} from "./eserver.jsx";

export * from "./enoaccess.jsx";
export * from "./enocontent.jsx";
export * from "./enotfound.jsx";
export * from "./eserver.jsx";

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
