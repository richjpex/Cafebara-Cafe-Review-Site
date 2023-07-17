import Container from 'react-bootstrap/Container';
import '../css/indexComponents/IndexlistCon.css';

function IndexlistCon() {
  return (
    <Container fluid="sm" className = "listCon">
        <div className = "listInfo">
          <h1>View all cafes around Taft Avenue</h1>
          <p>Can't decide where to go? We got you!</p>
          <a href="/review" className="view-btn">See List</a>
        </div>
    </Container>
  );
}

export default IndexlistCon;