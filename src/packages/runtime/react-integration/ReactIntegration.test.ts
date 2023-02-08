/**
 * @vitest-environment jsdom
 */
import { createElement } from "react";
import { beforeEach, expect, it } from "vitest";
import { usePropertiesInternal, useServiceInternal } from "./hooks";
import { findByText } from "@testing-library/dom";
import { Service } from "../Service";
// eslint-disable-next-line import/no-relative-packages
import { UI as TestUIFromPackage } from "./test-data/test-package/UI";
import { ServiceLayer } from "../services/ServiceLayer";
import { ReactIntegration } from "./ReactIntegration";
import { act } from "react-dom/test-utils";
import { PackageRepr } from "../services/PackageRepr";
import { ServiceRepr } from "../services/ServiceRepr";

export interface TestProvider {
    value: string;
}

beforeEach(() => {
    document.body.innerHTML = "";
});

it("should allow access to service via react hook", async () => {
    function TestComponent() {
        const service = useServiceInternal("test", "test.Provider") as TestProvider;
        return createElement("span", undefined, `Hello ${service.value}`);
    }

    const wrapper = document.createElement("div");
    const testService = new ServiceRepr({
        name: "Provider",
        packageName: "test",
        clazz: class Provider implements Service<TestProvider> {
            value = "TEST";
        },
        interfaces: [{ interfaceName: "test.Provider" }]
    });
    const testPackage = new PackageRepr({
        name: "test",
        uiReferences: [{ interfaceName: "test.Provider" }],
        services: [testService]
    });
    const serviceLayer = new ServiceLayer([testPackage]);
    serviceLayer.start();

    const reactIntegration = new ReactIntegration({
        rootNode: wrapper,
        container: wrapper,
        serviceLayer,
        packages: new Map([[testPackage.name, testPackage]])
    });

    act(() => {
        reactIntegration.render(TestComponent, {});
    });

    const node = await findByText(wrapper, "Hello TEST");
    expect(node).toMatchSnapshot();
});

it("should allow access to service with qualifier via react hook", async () => {
    function TestComponent() {
        const service = useServiceInternal("test", "test.Provider", {
            qualifier: "foo"
        }) as TestProvider;
        return createElement("span", undefined, `Hello ${service.value}`);
    }

    const wrapper = document.createElement("div");
    const testService = new ServiceRepr({
        name: "Provider",
        packageName: "test",
        clazz: class Provider implements Service<TestProvider> {
            value = "TEST";
        },
        interfaces: [{ interfaceName: "test.Provider", qualifier: "foo" }]
    });
    const testPackage = new PackageRepr({
        name: "test",
        uiReferences: [{ interfaceName: "test.Provider", qualifier: "foo" }],
        services: [testService]
    });
    const serviceLayer = new ServiceLayer([testPackage]);
    serviceLayer.start();

    const reactIntegration = new ReactIntegration({
        rootNode: wrapper,
        container: wrapper,
        serviceLayer,
        packages: new Map([[testPackage.name, testPackage]])
    });

    act(() => {
        reactIntegration.render(TestComponent, {});
    });

    const node = await findByText(wrapper, "Hello TEST");
    expect(node).toMatchSnapshot();
});

it("should be able to read properties from react component", async () => {
    function TestComponent() {
        const properties = usePropertiesInternal("test");
        return createElement("span", undefined, `Hello ${properties.name}`);
    }

    const wrapper = document.createElement("div");
    const serviceLayer = new ServiceLayer([]);
    serviceLayer.start();

    const testPackage = new PackageRepr({
        name: "test",
        properties: {
            name: "USER"
        }
    });
    const reactIntegration = new ReactIntegration({
        rootNode: wrapper,
        container: wrapper,
        serviceLayer,
        packages: new Map([[testPackage.name, testPackage]])
    });

    act(() => {
        reactIntegration.render(TestComponent, {});
    });

    const node = await findByText(wrapper, "Hello USER");
    expect(node).toMatchSnapshot();
});

it("should provide the autogenerated useProperties hook", async () => {
    const testPackageName = "@open-pioneer/runtime__react_test_package";
    const wrapper = document.createElement("div");
    const serviceLayer = new ServiceLayer([]);
    serviceLayer.start();

    const testPackage = new PackageRepr({
        name: testPackageName,
        properties: {
            greeting: "Hello World!"
        }
    });
    const reactIntegration = new ReactIntegration({
        rootNode: wrapper,
        container: wrapper,
        serviceLayer,
        packages: new Map([[testPackage.name, testPackage]])
    });

    act(() => {
        reactIntegration.render(TestUIFromPackage, {});
    });

    const node = await findByText(wrapper, "Hello World!");
    expect(node).toMatchSnapshot();
});

it("should get error when using undefined service", async () => {
    function TestComponent() {
        const service = useServiceInternal("test", "test.Provider") as TestProvider;
        return createElement("span", undefined, `Hello ${service.value}`);
    }
    const wrapper = document.createElement("div");
    const serviceLayer = new ServiceLayer([]);
    serviceLayer.start();

    const reactIntegration = new ReactIntegration({
        rootNode: wrapper,
        container: wrapper,
        serviceLayer,
        packages: new Map()
    });

    expect(() => {
        act(() => {
            reactIntegration.render(TestComponent, {});
        });
    }).toThrowErrorMatchingSnapshot();
});

it("should get error when requesting properties from an unknown package", async () => {
    const wrapper = document.createElement("div");
    const serviceLayer = new ServiceLayer([]);
    const reactIntegration = new ReactIntegration({
        rootNode: wrapper,
        container: wrapper,
        serviceLayer,
        packages: new Map()
    });

    function TestComponent() {
        const properties = usePropertiesInternal("test");
        return createElement("span", undefined, `Hello ${properties.name}`);
    }

    serviceLayer.start();

    expect(() => {
        act(() => {
            reactIntegration.render(TestComponent, {});
        });
    }).toThrowErrorMatchingSnapshot();
});
