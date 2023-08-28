import { Box, Container, Divider, Flex, Skeleton, Stack } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { SearchBar } from "../../components/SearchBar";
import { mapToResourceType } from "../../services/ResourceTypeUtils";
import { SolrSearchResultItem } from "../../services/SearchService";
import { ArticleMetadataResponse, ArticleView } from "../Article/Article";
import { DocumentView } from "../Document/Document";
import { OrganisationMetadataResponse, OrganisationView } from "../Organisation/Organisation";
import { RepositoryMetadataResponse, RepositoryView } from "../Repository/Repository";
import { useSearchState } from "../Search/SearchState";
import { StandardMetadataResponse, StandardView } from "../Standard/Standard";
import { ResourceType } from "../Start/ResourceEntry/ResourceEntry";
import { ToolsSoftwareMetadataResponse, ToolsSoftwareView } from "../ToolsSoftware/ToolsSoftware";

export function Result() {
    const resultId = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService");
    const [searchResult, setSearchResult] = useState<SolrSearchResultItem>();
    const [resourceType, setResourceType] = useState<ResourceType>();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [result, setResult] = useState<number>();
    const [resultCount, setResultCount] = useState<number>();
    const searchState = useSearchState();

    useEffect(() => {
        setLoading(true);
        searchSrvc.getMetadata(resultId).then((result) => {
            // TODO: remove timeout
            setTimeout(() => {
                if (result.results[0]) {
                    setSearchResult(result.results[0]);
                    setResourceType(mapToResourceType(result.results[0].type));
                    setLoading(false);
                } else {
                    // TODO: error handling
                }
            }, 1000);
        });
    }, [resultId, searchSrvc]);

    useEffect(() => {
        if (searchState.searchResults) {
            const idx = searchState.searchResults.results.findIndex((r) => r.id === resultId);
            setResult(idx + 1 + searchState.pageSize * searchState.pageStart);
            setResultCount(searchState.searchResults.count);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getResourceView(): import("react").ReactNode {
        switch (resourceType) {
            case ResourceType.Repos: {
                const item = searchResult as RepositoryMetadataResponse;
                return <RepositoryView item={item} />;
            }
            case ResourceType.Datasets:
                // TODO: needs to be implemented
                return <Box>Dataset</Box>;
            case ResourceType.Organisations: {
                const item = searchResult as OrganisationMetadataResponse;
                return <OrganisationView item={item} />;
            }
            case ResourceType.LHB_Articles: {
                return <DocumentView />;
            }
            case ResourceType.Services:
                // TODO: needs to be implemented
                return <Box>Service</Box>;
            case ResourceType.Tools: {
                const item = searchResult as ToolsSoftwareMetadataResponse;
                return <ToolsSoftwareView item={item} />;
            }
            case ResourceType.Standards: {
                const item = searchResult as StandardMetadataResponse;
                return <StandardView item={item} />;
            }
            case ResourceType.Articles: {
                const item = searchResult as ArticleMetadataResponse;
                return <ArticleView item={item} />;
            }
            case ResourceType.Educational:
            default:
                throw new Error(`Unknown resourceType: '${resourceType}'`);
        }
    }

    function stepBack(): void {
        if (result) {
            fetchResultId(result - 1);
        }
    }

    function stepForward(): void {
        if (result) {
            fetchResultId(result + 1);
        }
    }

    function stepToEnd(): void {
        if (resultCount) {
            fetchResultId(resultCount);
        }
    }

    function stepToStart(): void {
        if (result) {
            fetchResultId(1);
        }
    }

    function fetchResultId(result: number) {
        searchSrvc
            .doSearch({
                pageSize: 1,
                pageStart: result - 1,
                resourceTypes: searchState.selectedResoureTypes,
                searchTerm: searchState.searchTerm,
                spatialFilter: searchState.spatialFilter
            })
            .then((res) => {
                if (res.results[0]) {
                    navigate(`/result/${res.results[0].id}`);
                    setResult(result);
                }
            });
    }

    function renderPaging(): import("react").ReactNode {
        if (result !== undefined && resultCount !== undefined) {
            return (
                <ResultsNavigation
                    result={result}
                    of={resultCount}
                    label="result"
                    stepBack={stepBack}
                    stepFoward={stepForward}
                    stepToEnd={stepToEnd}
                    stepToStart={stepToStart}
                />
            );
        } else {
            return <></>;
        }
    }

    return (
        <Box className="search-view">
            <Box position="relative">
                <Box className="header-image" />
            </Box>

            <Box
                position="absolute"
                width="100%"
                marginTop={{ base: "-40px", custombreak: "-50px" }}
            >
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Box height={{ base: "50px", custombreak: "80px" }}></Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Flex gap="10%">
                    <Box w="65%">
                        <ResourceTypeHeader resType={resourceType} loading={loading} />
                        {loading ? (
                            <Box pt="30px">
                                <Box pb="40px">
                                    <Skeleton height="30px" />
                                </Box>
                                <Stack>
                                    <Skeleton height="20px" />
                                    <Skeleton height="20px" />
                                    <Skeleton height="20px" />
                                </Stack>
                            </Box>
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box w="25%">{renderPaging()}</Box>
                </Flex>
                {loading ? (
                    <></>
                ) : (
                    <>
                        <Box>{getResourceView()}</Box>
                    </>
                )}
                <Flex gap="10%" alignItems="center" pt="120px">
                    <Divider className="seperator" w="65%" />
                    <Box w="25%">{renderPaging()}</Box>
                </Flex>
            </Container>
        </Box>
    );
}
