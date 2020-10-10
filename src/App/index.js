


import React from 'react';

import { Container, Tabs, Tab } from 'react-bootstrap';
import Table from '../Table';

import drivers from '../Data/drivers.json';
import teams from '../Data/teams.json';

import styles from '../Styles';

export default function App() {

    return (
        <Container>

            <Tabs defaultActiveKey="drivers" style={styles.tabStyle}>
                <Tab eventKey="drivers" title="Drivers">
                    <Table
                        headers={['#', 'Team', 'Points']}
                        data={teams.teams}
                        type='teams'
                    >
                    </Table>
                </Tab>
                <Tab eventKey="teams" title="Teams">
                    <Table
                        headers={['#', 'Name', 'Team', 'Points']}
                        data={drivers.drivers}
                        type='drivers'
                        >
                    </Table>
                </Tab>
            </Tabs>

        </Container>
    );
}
