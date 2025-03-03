import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    GlobalHeaderNavItem,
    GlobalHeaderGlobalItemIcon,
} from '@mattermost/components';
import {FaAt} from 'react-icons/fa';
import styled from 'styled-components';

const MentionsButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 16px;
    margin: 10px 0;
    color: rgba(var(--sidebar-text-rgb), 0.6);
    cursor: pointer;
    
    &:hover {
        color: rgba(var(--sidebar-text-rgb), 1);
    }
    
    &.active {
        color: var(--sidebar-text);
    }
    
    .mention-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 3px;
        font-size: 11px;
        font-weight: 600;
        border-radius: 8px;
        padding: 0 4px;
        min-width: 16px;
        height: 16px;
        background-color: var(--sidebar-text);
        color: var(--sidebar-bg);
    }
`;

export const LeftSidebar = () => {
    const mentionsCounter = useSelector((state) => {
        if (state.views && state.views.rhsState) {
            // Accessing mentions counts from state
            // This may need to be adjusted based on your Mattermost version and state structure
            if (state.entities && state.entities.general && state.entities.general.mentionsCount) {
                return state.entities.general.mentionsCount;
            }
        }
        return 0;
    });
    
    const dispatch = useDispatch();
    
    const handleMentionsClick = () => {
        // Dispatching action to show mentions RHS
        dispatch({
            type: 'SELECT_RHS_VIEW',
            payload: {
                view: 'mentions',
            },
        });
    };
    
    return (
        <MentionsButton
            onClick={handleMentionsClick}
            className={mentionsCounter > 0 ? 'active' : ''}
        >
            <FaAt size={20} />
            <span style={{marginLeft: '8px'}}>メンション</span>
            {mentionsCounter > 0 && (
                <div className="mention-badge">
                    {mentionsCounter > 99 ? '99+' : mentionsCounter}
                </div>
            )}
        </MentionsButton>
    );
};

export default LeftSidebar;
