import { Box, ChakraProvider, Container, Flex } from "@open-pioneer/chakra-integration";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { BaseMenu } from "./components/BaseMenu/BaseMenu";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Theme } from "./Theme";
import { DatasetView } from "./views/Dataset/Dataset";
import { DocumentView } from "./views/Document/Document";
import { OerView } from "./views/OpenEducationalResource/Oer";
import { OrganisationView } from "./views/Organisation/Organisation";
import { RepositoryView } from "./views/Repository/Repository";
import { SearchView } from "./views/Search/Search";
import { SearchState } from "./views/Search/SearchState";
import { ServiceView } from "./views/Service/Service";
import { StandardView } from "./views/Standard/Standard";
import { StartView } from "./views/Start/Start";
import { ToolsSoftwareView } from "./views/ToolsSoftware/ToolsSoftware";

const basePath = "/";

const router = createBrowserRouter([
    {
        path: `${basePath}`,
        element: <Layout />,
        children: [
            {
                path: ``,
                element: <StartView />
            },
            {
                path: `search`,
                element: (
                    <SearchState>
                        <SearchView />
                    </SearchState>
                )
            },
            {
                path: `standard`,
                element: <StandardView />
            },
            {
                path: `service`,
                element: <ServiceView />
            },
            {
                path: `tools_software`,
                element: <ToolsSoftwareView />
            },
            {
                path: `oer`,
                element: <OerView />
            },
            {
                path: `repository`,
                element: <RepositoryView />
            },
            {
                path: `dataset`,
                element: <DatasetView />
            },
            {
                path: `organisation`,
                element: <OrganisationView />
            },
            {
                path: `document`,
                element: <DocumentView />
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }
        ]
    }
]);

export function AppUI() {
    return <RouterProvider router={router}></RouterProvider>;
}

function Layout() {
    return (
        <>
            <ChakraProvider theme={Theme}>
                <BaseMenu></BaseMenu>

                <Flex as="header" position="fixed" w="100%" bg="white" zIndex="1000">
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <Header></Header>
                    </Container>
                </Flex>

                <Box as="main" w="100%" pt="152px">
                    <Outlet />
                </Box>

                <Box as="footer" w="100%">
                    <Footer></Footer>
                </Box>
            </ChakraProvider>
        </>
    );
}