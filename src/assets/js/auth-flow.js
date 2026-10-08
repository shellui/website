// Lazy mount for the /features/authentication/ diagram. The React island is a
// separate bundle so every other page stays on the Eleventy + Alpine budget.
import { lazyMountGraphIsland } from "./graph-island.js";

lazyMountGraphIsland({
  containerSelector: "[data-auth-flow]",
  islandUrl: "/assets/js/auth-flow.island.js",
});
