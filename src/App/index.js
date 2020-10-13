


import React from 'react';

import { Container, Tabs, Tab, Dropdown } from 'react-bootstrap';
import Table from '../Table';

import drivers from '../Data/drivers.json';
import teams from '../Data/teams.json';
import races from '../Data/races.json';

import styles from '../Styles';

export default function App() {

    const [selRace, setSelRace] = React.useState('Australia');

    return (
        <Container>

            <Tabs defaultActiveKey="results" style={styles.tabStyle}>
                <Tab eventKey="drivers" title="Drivers">
                    <Table
                        headers={['#', 'Name', 'Team', 'Points']}
                        data={drivers.drivers}
                        type='drivers'
                    >
                    </Table>
                </Tab>
                <Tab eventKey="teams" title="Teams">
                    <Table
                        headers={['#', 'Team', 'Points']}
                        data={teams.teams}
                        type='teams'
                        >
                    </Table>
                </Tab>
                <Tab eventKey="results" title="Results">
                    <Container style={{background: '#333', padding: '10px'}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary">
                                {selRace}
                            </Dropdown.Toggle>
                            <Dropdown.Menu onClick={(event) => setSelRace(event.target.innerHTML)}>
                                {races.races.map((race, index) => {
                                    return (
                                        <Dropdown.Item key={index}>{race.name}</Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Container>
                    <Table
                        headers={['#', 'Name', 'Team', 'Points']}
                        type="results"
                        race={selRace}
                        data={[]}
                    >
                    </Table>
                </Tab>
            </Tabs>

        </Container>
    );
}
