import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { CopyIcon, DownloadIcon, LinkIcon } from "@chakra-ui/icons";
import { MetadataSourceIcon } from "../../components/Icons";
import { ResourceResultPaging } from "../../components/ResourceResultPaging/ResourceResultPaging";

export function DocumentView() {
    const metadataResponse = {
        resourceType: "Documents",
        title: "NFDI Consortium Earth System Sciences - Proposal 2020 revised",
        abstract:
            "DFG Consortia Proposals National Research Data Infrastructure (NFDI) from the NFDIConsortium Earth System Sciences, revised after the acceptance of the proposal. NFDI4Earth addresses digital needs of Earth System Sciences. Here, scientists cooperate ininternational and interdisciplinary networks with the overarching aim to understand the functioning and interactions within the Earth system and address the multiple challenges of global change. NFDI4Earth is a community-driven process providing researchers with FAIR, coherent, and openaccess to all relevant data, to innovative research data management and data science methods. The proposal comprises the NFDI4Earth scope and objectives, the description of the consortium and its governance, the research data management strategy and the 2021-26 work plan.",
        authors: [
            {
                name: "Bernard, Lars",
                orcid: "0000-0002-3085-7457"
            },
            {
                name: "Braesicke, Peter",
                orcid: "0000-0002-5588-0290"
            },
            {
                name: "Bertelmann, Roland",
                orcid: "0000-0002-5588-0290"
            }
        ],
        dateOfPublication: "22.11.2021",
        doi: "https://doi.org/10.5281/zenodo.5718944",
        license: "CC BY 4.0",
        keywords: [
            "NFDI",
            "Research Data management",
            "FAIR",
            "Earth System Sciences",
            "Data Infrastructure",
            "NFDI4Earth"
        ],
        relatedContentItems: [
            {
                resourceType: "Documents",
                title: "Deutsches Klimarechenzentrum",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Repositories / Archives",
                title: "World Data Center for Climate",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Services",
                title: "World Data Center for Climate",
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
                        <ResourceTypeHeader resType="Document" />
                        <Box className="title" pt="15px">
                            {metadataResponse["title"]}
                        </Box>
                        <Box pt="36px">
                            <Metadata
                                metadataElements={[
                                    {
                                        tag: "Authors",
                                        val: metadataResponse["authors"]
                                    },
                                    {
                                        tag: "Date of publication",
                                        val: metadataResponse["dateOfPublication"]
                                    },
                                    {
                                        tag: "DOI",
                                        val: metadataResponse["doi"]
                                    },
                                    {
                                        tag: "License",
                                        val: metadataResponse["license"]
                                    },
                                    {
                                        tag: "Keywords",
                                        val: metadataResponse["keywords"]
                                    }
                                ]}
                                visibleElements={0}
                                expandedByDefault={false}
                            />
                        </Box>
                        <Box pt="80px">
                            <Abstract abstractText={metadataResponse["abstract"]} />
                        </Box>
                    </Box>
                    <Box w="25%">
                        <ResourceResultPaging />
                        <Box className="actionButtonGroup" pt="74px">
                            <ActionButton
                                label="Copy Citation"
                                icon={<CopyIcon color="white" />}
                                variant="solid"
                                fun={fun}
                            />
                            <ActionButton
                                label="Download metadata"
                                icon={<DownloadIcon />}
                                variant="outline"
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
                            <ResourceResultPaging />
                        </Box>
                    </Flex>
                </Box>
                <Box pt="135px" />
            </Container>
        </Box>
    );
}
