export const OSM_RASTER_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

// export const DARK_MAP_STYLE = {
//   version: 8,
//   sources: {
//     "carto-dark": {
//       type: "raster",
//       tiles: [
//         // "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
//         // "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
//         "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
//       ],
//       tileSize: 256,
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
//     },
//   },
//   layers: [
//     {
//       id: "carto-dark-layer",
//       type: "raster",
//       source: "carto-dark",
//       paint: {
//         "raster-opacity": 1,
//       },
//     },
//   ],
// };

export const DARK_MAP_STYLE = {
  version: 8,
  sources: {
    // The Source ID is "dark_tiles"
    dark_tiles: {
      type: "raster",
      tiles: ["https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap &copy; CARTO",
    },
  },
  layers: [
    {
      id: "dark_layer",
      type: "raster",
      // ⚠️ CRITICAL: This MUST match the Source ID above ("dark_tiles")
      source: "dark_tiles",
      paint: {
        "raster-opacity": 1,
      },
    },
  ],
};
