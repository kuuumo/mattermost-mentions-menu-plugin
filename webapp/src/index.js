import manifest from "../manifest";
import React from "react";
import MentionsButton from "./components/mentions_button";

class Plugin {
  initialize(registry, store) {
    const MentionsSidebarButton = () => {
      return <MentionsButton />;
    };

    console.log("registerLeftSidebarHeaderComponent");

    if (registry.registerLeftSidebarHeaderComponent) {
      console.log("registerLeftSidebarHeaderComponent");
      registry.registerLeftSidebarHeaderComponent(MentionsSidebarButton);
    }
  }
}

window.registerPlugin(manifest.id, new Plugin());
