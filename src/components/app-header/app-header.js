import React from 'react';
import './app-header.css';
import style from 'styled-components';

const Header = style.div `
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 20px;
        :hover {
            color: green
        }
    };
    h2 {
        font-size: 1.2rem;
        color: grey;
        :hover {
            color: blue
        }
    };
`;

const AppHeader = ({allPosts, countLiked}) => {
    return (
        <Header>
            <h1>Pavel</h1>
            <h2>Количество постов - {allPosts}, из них понравилось - {countLiked}</h2>
        </Header>
    )
}

export default AppHeader;