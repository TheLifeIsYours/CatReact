import React from 'react'

const Footer = () => {
    return (
        <footer>
            <span>Made with <span role="img" aria-label="Sparkling Heart">💖</span> by </span>
            <a href="https://thelifeisyours.no/" title="thelifeisyours.no/">TheLifeIsYours</a>
            <span> © {new Date().getFullYear()}</span>
        </footer>
    )
}

export default Footer