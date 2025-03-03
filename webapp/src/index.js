import manifest from '../manifest';
import {LeftSidebar} from './components/left_sidebar';

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from 'mattermost-webapp/plugins/registry';

export default class Plugin {
    /**
     * @param {PluginRegistry} registry - Mattermost Plugin Registry
     */
    initialize(registry) {
        registry.registerLeftSidebarHeaderComponent(LeftSidebar);
    }
}

window.registerPlugin(manifest.id, new Plugin());
