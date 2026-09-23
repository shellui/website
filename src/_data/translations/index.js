import de from "./de.js";
import en from "./en.js";
import fr from "./fr.js";
import it from "./it.js";

/** @type {Record<string, import("./types.js").LocaleBundle>} */
const bundles = { en, fr, de, it };

/** @param {string} [lang] */
export function getLocaleBundle(lang) {
  return bundles[lang] || en;
}

export default getLocaleBundle;
