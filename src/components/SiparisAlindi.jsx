
import React from "react";
import styled from 'styled-components';


//Styled Components
const SiparisAlindi = styled.div`
  font-family: 'Roboto Condensed';
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ce2829;
  color: #faf7f2;
  width: 100vw;
  height: 100vh;

  h1 {
    margin-top: 50px;
    margin-bottom: 220px;
  }

  p {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    font-size: 76px;
    font-weight: 300;
    line-height: 82px;
    letter-spacing: 1.5px;
    text-align: center;
  }
`;

function Success() {
  return (
    <SiparisAlindi>
      <div className="siparisAlindi-Heading">
        <h1>Teknolojik Yemekler</h1>
      </div>
      <p>TEBRİKLER!</p>
      <p>SİPARİŞİNİZ ALINDI!</p>
    </SiparisAlindi>
  );
}

export default Success;
