import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { PdfIcon, MetadataSourceIcon } from "../../components/Icons";

export function StandardView() {
    const metadataResponse = {
        resourceType: "Standards",
        title: "OGC Web Map Service",
        abstract:
            "The Web Feature Service (WFS) represents a change in the way geographic information is created, modified and exchanged on the Internet. Rather than sharing geographic information at the file level using File Transfer Protocol (FTP), for example, the WFS offers direct fine-grained access to geographic information at the feature and feature property level. This International Standard specifies discovery operations, query operations, locking operations, transaction operations and operations to manage stored, parameterized query expressions. Discovery operations allow the service to be interrogated to determine its capabilities and to retrieve the application schema that defines the feature types that the service offers. Query operations allow features or values of feature properties to be retrieved from the underlying data store based upon constraints, defined by the client, on feature properties. Locking operations allow exclusive access to features for the purpose of modifying or deleting features. Transaction operations allow features to be created, changed, replaced and deleted from the underlying data store. Stored query operations allow clients to create, drop, list and described parameterized query expressions that are stored by the server and can be repeatedly invoked using different parameter values. This International Standard defines eleven operations: GetCapabilities (discovery operation) DescribeFeatureType (discovery operation) GetPropertyValue (query operation) GetFeature (query operation) GetFeatureWithLock (query & locking operation) LockFeature (locking operation) - Transaction (transaction operation) CreateStoredQuery (stored query operation) DropStoredQuery (stored query operation) ListStoredQueries (stored query operation) DescribeStoredQueries (stored query operation) In the taxonomy of services defined in ISO 19119, the WFS is primarily a feature access service but also includes elements of a feature type service, a coordinate conversion/transformation service and geographic format conversion service.",
        standardsOrganization: "Open Geospatial Consortium",
        dateOfPublication: "10.07.2014",
        version: "2.0.2",
        externalIdentifier: "http://www.opengis.net/doc/IS/wfs/2.0.2",
        keywords: [
            "ogcdoc",
            "OGC document",
            "web feature service",
            "wfs",
            "property",
            "geographic information",
            "resource",
            "geography markup language",
            "GML",
            "Transaction",
            "GetFeature",
            "GetCapabilities",
            "stored query",
            "XML",
            "KVP",
            "encoding",
            "Schema",
            "HTTP",
            "GET",
            "POST",
            "SOAP",
            "request",
            "response",
            "capabilities document",
            "filter encoding",
            "contraint"
        ],
        relatedContentItems: [
            {
                resourceType: "Repositories / Archives",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Services",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Documents",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Documents",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Documents",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            }
        ]
    };

    const fun = () => {
        console.log("This is a fun");
    };

    return (
        <Box>
            <Box position="relative">
                <Image src="/image2.png" width="100%" />
            </Box>

            <Box position="absolute" width="100%" marginTop="-70px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Container maxW="80%">
                <Box height="80px" />
                <Flex gap="10%">
                    <Box w="65%">
                        <ResourceTypeHeader resType={metadataResponse["resourceType"]} />
                        <Box className="title" pt="15px">
                            {metadataResponse["title"]}
                        </Box>
                        <Box pt="36px">
                            <Metadata
                                metadataElements={[
                                    {
                                        tag: "Standards organization",
                                        val: metadataResponse["standardsOrganization"]
                                    },
                                    {
                                        tag: "Date of publication",
                                        val: metadataResponse["dateOfPublication"]
                                    },
                                    { tag: "Version", val: metadataResponse["version"] },
                                    {
                                        tag: "External identifier",
                                        val: metadataResponse["externalIdentifier"]
                                    },
                                    { tag: "Keywords", val: metadataResponse["keywords"] }
                                ]}
                                visibleElements={4}
                            />
                        </Box>
                        <Box pt="80px">
                            <Abstract abstractText={metadataResponse["abstract"]} />
                        </Box>
                    </Box>
                    <Box w="25%">
                        <ResultsNavigation result={1} of={100} />
                        <Box className="actionButtonGroup" pt="74px">
                            <ActionButton
                                label="VISIT STANDARD WEBSITE"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={fun}
                            />
                            <ActionButton
                                label="DOWNLOAD AS PDF"
                                icon={<PdfIcon color="white" />}
                                variant="solid"
                                fun={fun}
                            />
                            <ActionButton
                                label="VISIT METADATA SOURCE"
                                icon={<MetadataSourceIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                            <ActionButton
                                label="COPY PERMALINK"
                                icon={<LinkIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                        </Box>
                    </Box>
                </Flex>
                <Box w="100%" pt="80px">
                    <Box>
                        <RelatedContent
                            relatedContentItems={metadataResponse["relatedContentItems"]}
                        />
                    </Box>
                    <Flex gap="10%" alignItems="center" pt="120px">
                        <Divider className="seperator" w="65%" />
                        <Box w="25%">
                            <ResultsNavigation result={1} of={100} />
                        </Box>
                    </Flex>
                </Box>
                <Box pt="135px" />
            </Container>
        </Box>
    );
}
