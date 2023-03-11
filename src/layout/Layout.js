import * as React from 'react';
import Box from '@mui/joy/Box';

export default function Header(props) {
    var align = {};
    if (props.align === "right") { align = { right: 0 } } else if (props.align === "left") { align = { left: 0 } };
    return (
        <Box
            variant="soft"
            color="primary"
            component="header"
            className="Header"
            {...props}
            sx={[
                {
                    p: 2,
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gridColumn: '1 / -1',
                    position: 'fixed',
                    top: 0,
                    zIndex: 1100,
                }, align,
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}
