import React from "react";
import { BiAt } from "react-icons/bi";

const getMentionButton = () => {
  return (
    document.querySelector('button[aria-label="Recent mentions"]') ||
    document.querySelector('button[aria-label="最近のメンションされた投稿"]')
  );
};

class MentionsButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mentionsCount: 0,
    };
  }

  componentDidMount() {
    const mentionsButton = getMentionButton();

    if (!mentionsButton) {
      console.error("Sidebar Mentions menu: Mentions button not found");
      return;
    }

    // コンポーネントがマウントされたら、メンション数を取得する
    this.updateMentionsCount();
    // 定期的に更新するためのインターバルを設定
    this.interval = setInterval(() => this.updateMentionsCount(), 10000);
  }

  componentWillUnmount() {
    // コンポーネントがアンマウントされたらインターバルをクリア
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateMentionsCount() {
    try {
      // Mattermostのグローバルストアからメンション数を取得
      if (window.reduxStore && window.reduxStore.getState) {
        const state = window.reduxStore.getState();
        if (
          state.entities &&
          state.entities.channels &&
          state.entities.channels.myMembers
        ) {
          const channelMembers = state.entities.channels.myMembers;
          let totalMentions = 0;

          Object.values(channelMembers).forEach((member) => {
            if (member.mention_count) {
              totalMentions += member.mention_count;
            }
          });

          this.setState({ mentionsCount: totalMentions });
        }
      }
    } catch (e) {
      console.error("Error getting mentions count:", e);
    }
  }

  handleMentionsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const mentionsButton = getMentionButton();

      if (mentionsButton) {
        mentionsButton.click();
      }
    } catch (e) {
      console.error("Error handling mentions click:", e);
    }
  };

  render() {
    const { mentionsCount } = this.state;

    const mentionBadgeStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: "4px",
      fontSize: "11px",
      fontWeight: "600",
      borderRadius: "8px",
      padding: "0 4px",
      minWidth: "16px",
      height: "16px",
      backgroundColor: "var(--sidebar-text, #ffffff)",
      color: "var(--sidebar-bg, #1e325c)",
    };

    return (
      <ul className="NavGroupContent nav nav-pills__container">
        <li
          className="mentions-sidebar-item SidebarChannel"
          tabIndex={0}
          aria-label="メンション"
        >
          <a
            className="SidebarLink sidebar-item"
            onClick={this.handleMentionsClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                this.handleMentionsClick();
              }
            }}
          >
            <span
              className="icon"
              style={{
                display: "flex",
                marginRight: "7px",
                padding: "3px",
                marginLeft: "-1px",
              }}
            >
              <BiAt size={18} />
            </span>
            <div className="SidebarChannelLinkLabel_wrapper">
              <span className="SidebarChannelLinkLabel sidebar-item__name">
                メンション
              </span>
            </div>
            {mentionsCount > 0 && (
              <div style={mentionBadgeStyle}>
                {mentionsCount > 99 ? "99+" : mentionsCount}
              </div>
            )}
          </a>
        </li>
      </ul>
    );
  }
}

export default MentionsButton;
