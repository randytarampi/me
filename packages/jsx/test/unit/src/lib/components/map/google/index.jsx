import {expect} from "chai";
import {shallow, mount} from "enzyme";
import React from "react";
import sinon from "sinon";
import {GoogleMapComponent, ComposedGoogleMap} from "../../../../../../../src/lib/components";

describe("GoogleMap", function () {
    describe("ComposedGoogleMap", function () {
        it("renders", function () {
            const stubProps = {
                id: "woof",
                googleMapRef: "meow",
                loadingElement: "grr",
                googleMapURL: "rawr"
            };

            const rendered = mount(<ComposedGoogleMap {...stubProps}/>);

            // expect(rendered).to.have.descendants(GoogleMap);
            // expect(rendered.find(GoogleMap)).to.have.prop("ref", stubProps.googleMapRef);
            expect(rendered).to.have.prop("googleMapRef", stubProps.googleMapRef);
            expect(rendered).to.have.prop("loadingElement", stubProps.loadingElement);
            expect(rendered).to.have.prop("googleMapURL", stubProps.googleMapURL);
            expect(rendered).to.have.prop("defaultZoom", 10);
        });
    });

    describe("GoogleMapComponent", function () {
        describe("constructor", function () {
            it("calls instantiateMap if it's passed", function () {
                const stubInstantiateMap = sinon.stub();
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    instantiateMap: stubInstantiateMap
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);
                const component = rendered.instance();

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                sinon.assert.calledWith(stubInstantiateMap, component.getGoogleMap, stubProps.id);
            });

            it("binds any passed googleMapCallbacks", function () {
                const stubOnIdle= sinon.stub();
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    onIdle: stubOnIdle
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);
                const component = rendered.instance();

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(rendered).to.have.prop("onIdle", component.passedGoogleMapCallbackProps.onIdle);
            });
        });

        describe("componentWillUnmount", function () {
            it("calls clearMap if it's passed with !persistentMap", function () {
                const stubClearMap = sinon.stub();
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    clearMap: stubClearMap,
                    persistentMap: false
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                sinon.assert.notCalled(stubClearMap);

                rendered.unmount();
                sinon.assert.calledWith(stubClearMap, stubProps.id);
            });

            it("doesn't call clearMap if it's passed with persistentMap", function () {
                const stubClearMap = sinon.stub();
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    clearMap: stubClearMap,
                    persistentMap: true
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                sinon.assert.notCalled(stubClearMap);

                rendered.unmount();
                sinon.assert.notCalled(stubClearMap);
            });

            it("doesn't explode if !clearMap and !persistentMap", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    persistentMap: false
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);

                rendered.unmount();
            });

            it("doesn't explode if !clearMap and persistentMap", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    persistentMap: true
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);

                rendered.unmount();
            });
        });

        describe("getGoogleMap", function () {
            it("returns googleMapRef", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);
                const component = rendered.instance();

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(component.getGoogleMap()).to.eql(component.googleMapRef.current);
                expect(component.getGoogleMap()).to.eql(component.googleMap);
            });
        });

        describe("render", function () {
            it("renders (defaults)", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);
                const component = rendered.instance();

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(shallow(rendered.prop("containerElement"))).to.have.className("map__container map__container--google");
                expect(shallow(rendered.prop("loadingElement"))).to.have.className("map__loading");
                expect(shallow(rendered.prop("mapElement"))).to.have.className("map map--google");
                expect(rendered).to.have.prop("googleMapRef", component.googleMapRef);
            });

            it("renders (mapContainerHeight)", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    mapContainerHeight: "123px"
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(shallow(rendered.prop("containerElement")).prop("style")).to.eql({
                    height: stubProps.mapContainerHeight,
                    minHeight: stubProps.mapContainerHeight
                });
            });

            it("renders (mapContainerHeightPx)", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    mapContainerHeightPx: 123
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(shallow(rendered.prop("containerElement")).prop("style")).to.eql({
                    height: `${stubProps.mapContainerHeightPx}px`,
                    minHeight: `${stubProps.mapContainerHeightPx}px`
                });
            });

            it("renders (containerElement)", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    containerElement: () => <div>Woof</div> // eslint-disable-line react/display-name
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(rendered).to.have.prop("containerElement", stubProps.containerElement);
            });

            it("renders (loadingElement)", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    loadingElement: () => <div>Woof</div> // eslint-disable-line react/display-name
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(rendered).to.have.prop("loadingElement", stubProps.loadingElement);
            });

            it("renders (mapElement)", function () {
                const stubProps = {
                    id: "woof",
                    meow: "grr",
                    mapElement: () => <div>Woof</div> // eslint-disable-line react/display-name
                };

                const rendered = shallow(<GoogleMapComponent {...stubProps}/>);

                expect(rendered).to.have.descendants(ComposedGoogleMap);
                expect(rendered).to.have.prop("mapElement", stubProps.mapElement);
            });
        });
    });
});
