import React from 'react'
import "./Footer.css"
export const Footer = () => {
     const year = new Date().getFullYear();

    return <footer>{`Copyright © Zhioua Mohamed Code ${year}`}</footer>;  
}
