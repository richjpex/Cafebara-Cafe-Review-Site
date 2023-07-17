import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import React, { lazy } from "react";
import '../css/indexComponents/IndexCarousel.css';

function IndexCarousel() {
     // lazy loading
    // replace w/ some code to get image urls from database
    const images = ['images/cafes/bigboss.jpeg',
                    'images/cafes/bos.jpeg',
                    'images/cafes/coffee-project.jpeg',
                    'images/cafes/nitro7.jpeg',
                    'images/cafes/obscure.jpg',
                    'images/cafes/starbs.jpg'];

    //proposed solution for carousel
    //make a carousel component
    //make arrays for information from database like img url, avg price, etc
    //use a for loop or something? to make a card for each item in the array
    //import carousel here
  return (
    <>
    <Container fluid = "sm">
        <h3 className="recommended">
          NEWLY OPENED AROUND TAFT
        </h3>
        <p className="recommended">
          Recommended
        </p>
    </Container>

    <Container fluid = "sm" className = "wrapper">
        <i id="left" className="fa-solid fa-angle-left"></i>

        <ul className = "carousel">
            <Card className="cardui">
                <Card.Img variant = "top" src={images[0]} alt="img" draggable="false" />

                <Card.Body>
                <a href="../../html/cafes/bigboss.html">
                <Card.Title>Big Boss</Card.Title>
                </a>
                <Card.Text>Avg. Price: ₱250.00</Card.Text>
                </Card.Body>
            </Card>

            <Card className="cardui">
                <Card.Img variant = "top" src={images[1]} alt="img" draggable="false" />

                <Card.Body>
                <a href="../../html/cafes/bos.html">
                <Card.Title>Bo's Coffee</Card.Title></a>
                <Card.Text>Avg. Price: ₱200.00</Card.Text>
                </Card.Body>
            </Card>

            <Card className="cardui">
                <Card.Img variant = "top" src={images[2]} alt="img" draggable="false" />

                <Card.Body>
                <a href="../../html/cafes/coffee-project.html">
                <Card.Title>Coffee Project</Card.Title>
                </a>
                <Card.Text>Avg. Price: ₱300.00</Card.Text>
                </Card.Body>
            </Card>

            <Card className="cardui">
                <Card.Img variant = "top" src={images[3]} alt="img" draggable="false" />
                
                <Card.Body>
                <a href="../../html/cafes/nitro7.html">
                <Card.Title>Nitro 7 Coffee & Tea Bar</Card.Title></a>
                <Card.Text>Avg. Price: ₱190.00</Card.Text>
                </Card.Body>
            </Card>

            <Card className="cardui">
                <Card.Img variant="top" src={images[4]} alt="img" draggable="false" />

                <Card.Body>
                <a href="../../html/cafes/obscure.html">
                <Card.Title>Obscure</Card.Title>
                </a>
                <Card.Text>Avg. Price: ₱220.00</Card.Text>
                </Card.Body>
            </Card>

            <Card className="cardui">
                <Card.Img variant="top" src={images[5]} alt="img" draggable="false" />

                <Card.Body>
                <a href="../../html/cafes/starbs.html">
                <Card.Title>Starbucks Green Court</Card.Title></a>
                <Card.Text>Avg. Price: ₱350.00</Card.Text>
                </Card.Body>
            </Card>
        </ul>

        <i id="right" className="fa-solid fa-angle-right"></i>
    </Container>
    </>
  );
}

export default IndexCarousel;