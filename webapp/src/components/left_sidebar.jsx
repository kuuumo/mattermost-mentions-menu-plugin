import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FaAt} from 'react-icons/fa';

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
    
    const mentionBadgeStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '3px',
        fontSize: '11px',
        fontWeight: '600',
        borderRadius: '8px',
        padding: '0 4px',
        minWidth: '16px',
        height: '16px',
        backgroundColor: 'var(--sidebar-text)',
        color: 'var(--sidebar-bg)',
    };
    
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 16px',
        margin: '10px 0',
        color: 'rgba(var(--sidebar-text-rgb), 0.6)',
        cursor: 'pointer',
    };
    
    return (
        <div 
            onClick={handleMentionsClick}
            style={buttonStyle}
            className={mentionsCounter > 0 ? 'active' : ''}
        >
            <FaAt size={20} />
            <span style={{marginLeft: '8px'}}>メンション</span>
            {mentionsCounter > 0 && (
                <div style={mentionBadgeStyle}>
                    {mentionsCounter > 99 ? '99+' : mentionsCounter}
                </div>
            )}
        </div>
    );
};

export default LeftSidebar;
