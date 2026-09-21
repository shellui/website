// Lazy mount for the /architecture/ diagram. The React island is a separate
// bundle so every other page stays on the Eleventy + Alpine budget.
import { lazyMountGraphIsland } from "./graph-island.js";

lazyMountGraphIsland({
  containerSelector: "[data-architecture-graph]",
  islandUrl: "/assets/js/architecture-graph.island.js",
});
