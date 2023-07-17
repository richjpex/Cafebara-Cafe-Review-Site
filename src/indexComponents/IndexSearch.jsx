import Container from 'react-bootstrap/Container';
import '../css/indexComponents/IndexSearch.css'

function IndexSearch() {
  return (
    <Container fluid className='search-container'>
        <h1>Cafebara</h1>
        <p>Explore user-reviewed cafes here</p>
        <form className="search-form">
            <input type="text" name="search" placeholder="Search..." />
            <button type="submit"><i className="fas fa-search"></i></button>
        </form>
    </Container>
  );
}

export default IndexSearch;