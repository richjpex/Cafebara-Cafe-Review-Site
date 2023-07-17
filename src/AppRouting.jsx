import Navibar from './Navbar.jsx';
import Index from './index.jsx';
import About from './about.jsx';
import Review from './review.jsx';
import React from 'react';

function AppRouting() {
    const navs = [<Navibar />, <Navibar />, <Navibar />]
    switch(location.pathname) {
        case '/':
        case '/home':
            return (<>
                    <Navibar />
                    {navs}
                    <Index />
                    </>);
        case '/about':
            return (<>
                    <Navibar />
                    <About />
                    </>);
        case '/review':
            return (<>
                    <Navibar />
                    <Review />
                    </>);
        }
}

export default AppRouting;