import Container from 'react-bootstrap/Container';
import IndexlistCon from './indexComponents/IndexlistCon.jsx';
import IndexSearch from './indexComponents/IndexSearch.jsx';
import IndexCarousel from './indexComponents/IndexCarousel.jsx';
import './css/index.css';
import React, { useEffect } from "react";
import CarouselJS from './scripts/index-carousel.jsx';



function Index() {
    useEffect(() => {
        CarouselJS();
      }, []);
    return (
      <Container fluid className='userCon'>
          <IndexSearch />
          <IndexlistCon />
          <IndexCarousel />
      </Container>
    );
  }
  
  export default Index;