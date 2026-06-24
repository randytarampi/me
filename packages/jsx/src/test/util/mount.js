import React from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";

export const mount = store => (node, options = {}) => render(<Provider store={store}>{node}</Provider>, options);

export default mount;
