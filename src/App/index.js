


import React from 'react';

import { Container } from 'react-bootstrap';
import Table from '../Table';

import drivers from '../Data/drivers.json';

export default function App() {


    return (
        <Container>
            <Table
                headers={['#', 'Name', 'Team', 'Points']}
                data={drivers.drivers}
            >

            </Table>
        </Container>
    );
}
