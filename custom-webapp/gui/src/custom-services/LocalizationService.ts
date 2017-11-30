import { String } from "@sdl/models";
import {
    LocalizationService as LocalizationServiceBase,
    DEFAULT_LANGUAGE,
    DEFAULT_LANGUAGES
} from "@custom-sdl/dd/base/services/common/LocalizationService";

const ES_LANGUAGE = "es";

DEFAULT_LANGUAGES.push(ES_LANGUAGE);

export { DEFAULT_LANGUAGE, DEFAULT_LANGUAGES };

interface IDic {
    [path: string]: string;
}

const LanguageResources: IDic = require("resources.es.resjson") as IDic;
const translate = (path: string) => (path in LanguageResources ? LanguageResources[path] : null);
const formatMessage = (resource: string, variables?: string[]) => (Array.isArray(variables) ? String.format(resource, variables) : resource);

/**
 * Localization service
 *
 * @export
 * @class LocalizationService
 * @implements {ILocalizationService}
 */
export class LocalizationService extends LocalizationServiceBase {
    /**
     * Format a message
     *
     * @param {string} path Resource path
     * @param {string[]} [variables] Variables
     * @returns {string}
     */
    public formatMessage(path: string, variables?: string[]): string {
        const lang = this.getLanguage();
        if (lang == ES_LANGUAGE) {
            const resource = translate(path);
            if (resource) {
                return formatMessage(resource, variables);
            }
        }

        return super.formatMessage(path, variables);
    }
}

export let localization = new LocalizationService();
