import React from 'react'

interface VisibilityProps {
    visible: boolean;
    children: JSX.Element
    replacement?: JSX.Element
}

export function Visibility({
    children,
    replacement,
    visible
}: VisibilityProps){
    return (
        visible ? children : replacement || <></>
        
    )
} 