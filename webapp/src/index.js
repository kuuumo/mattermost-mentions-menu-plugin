import manifest from '../manifest';
import {LeftSidebar} from './components/left_sidebar';

export default class Plugin {
    /**
     * @param {object} registry - Mattermost Plugin Registry
     */
    initialize(registry) {
        registry.registerLeftSidebarHeaderComponent(LeftSidebar);
    }
}

window.registerPlugin(manifest.id, new Plugin());
