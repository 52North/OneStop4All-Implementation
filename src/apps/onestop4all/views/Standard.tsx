import { Box, Container, Image } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../components/SearchBar";
import { ResourceTypeHeader } from "../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../components/ResourceType/Abstract/Abstract";

export function StandardView() {
    const metadataElements = [
        { tag: "Standards organization", val: "Open Geospatial Consortium" },
        { tag: "Date of publication", val: "10.07.2014" },
        { tag: "Version", val: "2.0.2" },
        { tag: "External Identifier", val: "http://www.opengis.net/doc/IS/wfs/2.0.2" },
        {
            tag: "Keywords",
            val: [
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
            ]
        }
    ];
    const abstractText =
        "The Web Feature Service (WFS) represents a change in the way geographic information is created, modified and exchanged on the Internet." +
        "Rather than sharing geographic information at the file level using File Transfer Protocol (FTP), for example, the WFS offers direct fine-grained access to geographic information at the feature and feature property level." +
        "This International Standard specifies discovery operations, query operations, locking operations, transaction operations and operations to manage stored, parameterized query expressions. " +
        "Discovery operations allow the service to be interrogated to determine its capabilities and to retrieve the application schema that defines the feature types that the service offers. " +
        "Query operations allow features or values of feature properties to be retrieved from the underlying data store based upon constraints, defined by the client, on feature properties. " +
        "Locking operations allow exclusive access to features for the purpose of modifying or deleting features." +
        "Transaction operations allow features to be created, changed, replaced and deleted from the underlying data store." +
        "Stored query operations allow clients to create, drop, list and described parameterized query expressions that are stored by the server and can be repeatedly invoked using different parameter values." +
        "This International Standard defines eleven operations:<br>" +
        "<ul><li>GetCapabilities (discovery operation)</li></ul>" +
        "- DescribeFeatureType (discovery operation)" +
        "- GetPropertyValue (query operation)" +
        "- GetFeature (query operation)" +
        "- GetFeatureWithLock (query & locking operation)" +
        "- LockFeature (locking operation)" +
        "- Transaction (transaction operation)" +
        "- CreateStoredQuery (stored query operation)" +
        "- DropStoredQuery (stored query operation)" +
        "- ListStoredQueries (stored query operation)" +
        "- DescribeStoredQueries (stored query operation)" +
        "In the taxonomy of services defined in ISO 19119, the WFS is primarily a feature access service but also includes elements of a feature type service, a coordinate conversion/transformation service and geographic format conversion service.";
    const hideMetadata = false;
    return (
        <>
            <Image src="/image2.png" width="100%" />
            <Box position="absolute" width="100%" marginTop="-50px">
                BorderColor
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>
            <Container maxW="100%">
                <ResourceTypeHeader resType="standard"></ResourceTypeHeader>
                <Metadata hide={hideMetadata} metadataElements={metadataElements} />
                <Abstract abstractText={abstractText}></Abstract>
            </Container>
        </>
    );
}
