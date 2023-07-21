import { Box, Button, IconButton } from "@open-pioneer/chakra-integration";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import { Feature } from "ol";
import { Polygon } from "ol/geom";
import Point from "ol/geom/Point";
import { fromExtent } from "ol/geom/Polygon";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";

import { PointSelectIcon, RectangleSelectIcon } from "../../../../components/Icons";
import { useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";

const usedEPSGCode = "EPSG:4326";
export function SpatialCoverageFacet() {
    const MAP_ID = "spatial-coverage-map";
    const { map } = useMap(MAP_ID);

    const searchState = useSearchState();

    const [source] = useState(new VectorSource({ wrapX: false }));
    const [vector] = useState(
        new VectorLayer({
            source: source
        })
    );
    const draw = useRef<Draw>();

    useEffect(() => {
        if (map) {
            map.addLayer(vector);
            return () => {
                map.removeLayer(vector);
            };
        }
    }, [map, vector]);

    useEffect(() => {
        if (map && searchState.spatialFilter) {
            const mapEPSG = map.getView().getProjection().getCode();
            if (searchState.spatialFilter.length === 2) {
                const point = new Point(searchState.spatialFilter).transform(usedEPSGCode, mapEPSG);
                const pointFeature = new Feature<Point>(point);
                source.addFeature(pointFeature);
            }

            if (searchState.spatialFilter.length === 4) {
                const bbox = fromExtent(searchState.spatialFilter).transform(usedEPSGCode, mapEPSG);
                const bboxFeature = new Feature<Polygon>(bbox);
                source.addFeature(bboxFeature);
            }

            if (searchState.spatialFilter.length === 0) {
                source.clear();
            }
        }
    }, [map, searchState.spatialFilter, source]);

    function setSearchArea(): void {
        const features = source.getFeatures();
        const geom = features[0]?.getGeometry();
        if (geom && map) {
            const sourceEPSG = map.getView().getProjection().getCode();
            const transformedGeom = geom.clone().transform(sourceEPSG, usedEPSGCode);
            if (transformedGeom instanceof Point) {
                const coords = transformedGeom.getCoordinates();
                searchState.setSpatialFilter(coords);
            }
            if (transformedGeom instanceof Polygon) {
                const extent = transformedGeom.getExtent();
                searchState.setSpatialFilter(extent);
            }
        }
    }

    function selectBbox(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Circle",
                geometryFunction: createBox()
            })
        );
    }

    function selectPoint(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Point"
            })
        );
    }

    function addInteraction(newDraw: Draw) {
        if (draw.current) {
            map?.removeInteraction(draw.current);
        }
        draw.current = newDraw;
        newDraw.on("drawstart", () => source.clear());
        map?.addInteraction(newDraw);
    }

    return (
        <Box>
            <FacetBase title="Spatial Coverage" expanded>
                <Box height="300px" marginBottom="16px" position="relative">
                    <IconButton
                        aria-label="rectangle select"
                        size="xs"
                        position="absolute"
                        zIndex="1000"
                        right="10px"
                        bottom="45px"
                        onClick={() => selectBbox()}
                        icon={<RectangleSelectIcon />}
                    />
                    <IconButton
                        aria-label="point select"
                        size="xs"
                        position="absolute"
                        zIndex="1000"
                        right="10px"
                        bottom="10px"
                        onClick={() => selectPoint()}
                        icon={<PointSelectIcon />}
                    />
                    <MapContainer mapId={MAP_ID} />
                </Box>
                <Button width="100%" onClick={() => setSearchArea()}>
                    set search area
                </Button>
            </FacetBase>
        </Box>
    );
}
