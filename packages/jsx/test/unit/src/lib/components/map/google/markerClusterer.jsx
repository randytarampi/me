import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer";
import {GoogleMapMarkerClustererComponent} from "../../../../../../../src/lib/components";
import {GoogleMapMarkerClustererStyles} from "../../../../../../../src/lib/components/map/google/styles";

describe("GoogleMapMarkerClusterer", function () {
    describe("GoogleMapMarkerClustererComponent", function () {
        it("renders", function () {
            const stubProps = {woof: "meow"};

            const rendered = shallow(<GoogleMapMarkerClustererComponent {...stubProps}/>);

            expect(rendered).to.containMatchingElement(
                <MarkerClusterer
                    defaultStyles={GoogleMapMarkerClustererStyles}
                    defaultMaxZoom={15}
                    {...stubProps}
                />
            );
        });
    });
});
