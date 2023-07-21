import { Box, Button, HStack, IconButton, Input, Select } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";
import { useContext, useEffect, useState } from "react";

import { BorderColor, PrimaryColor } from "../Theme";
import { SearchStateContext } from "../views/Search/SearchState";
import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";
import { DropdownArrowIcon, SearchIcon } from "./Icons";

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const intl = useIntl();
    const [selectedResource, setSelectResource] = useState("");
    const resourceTypes = Object.values(ResourceType);
    const searchState = useContext(SearchStateContext);

    useEffect(() => {
        if (searchState !== undefined) {
            setSearchTerm(searchState.searchTerm);
        }
    }, [searchState, searchState?.searchTerm]);

    function startSearch(): void {
        // TODO: second options to navigate on it's own
        searchState?.setSearchterm(searchTerm);
    }

    function handleKeyDown(key: string): void {
        if (key === "Enter") {
            startSearch();
        }
    }

    return (
        <Box
            borderWidth={{ base: "10px", custombreak: "15px" }}
            borderColor="rgb(5, 102, 141, 0.7)"
        >
            <HStack padding={{ base: "5px 10px", custombreak: "8px 15px" }} w="100%" bg="white">
                <Select
                    icon={<DropdownArrowIcon />}
                    iconSize="12"
                    variant="unstyled"
                    textTransform="uppercase"
                    color={PrimaryColor}
                    placeholder="All resources"
                    borderColor="white"
                    flex={{ base: "0 0 100px", custombreak: "0 0 250px" }}
                    value={selectedResource}
                    onChange={(event) => setSelectResource(event.target.value)}
                >
                    {createResourceTypeSelectOptions()}
                </Select>
                <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                <Input
                    placeholder={intl.formatMessage({ id: "search.search-bar.placeholder" })}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event.key)}
                    borderColor="white"
                />
                <Button
                    leftIcon={<SearchIcon boxSize={6} />}
                    variant="solid"
                    hideBelow="custombreak"
                    onClick={() => startSearch()}
                >
                    <Box>{intl.formatMessage({ id: "search.search-bar.button-label" })}</Box>
                </Button>
                <IconButton
                    aria-label="start search"
                    size="sm"
                    hideFrom="custombreak"
                    onClick={() => startSearch()}
                    icon={<SearchIcon />}
                />
            </HStack>
        </Box>
    );

    function createResourceTypeSelectOptions() {
        return resourceTypes.map((e, i) => (
            <option value={e} key={i}>
                {e}
            </option>
        ));
    }
}
