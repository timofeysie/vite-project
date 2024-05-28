import React from "react";
import styled from "styled-components";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavWrapper = styled.nav`
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 30px;
  }

  li {
    margin-right: 50px;
  }
`;

const Logo = styled.img`
  height: 1.5rem;
  width: 5rem;
  margin-right: 10px;
`;

const Nav = () => {
  return (
    <Header className="gradient--grey -fixed -overlay -transparent-gradient">
      <LogoWrapper>
        <Logo src="/logo.svg" alt="Stan Logo" />
      </LogoWrapper>
      <NavWrapper>
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
        </ul>
      </NavWrapper>
    </Header>
  );
};

export default Nav;