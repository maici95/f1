


import React from 'react';

import { Table as TableRB } from 'react-bootstrap';

import pointsSys from '../Data/points.json';
import races from '../Data/races.json';
import drivers from '../Data/drivers.json';

import styles from '../Styles';

export default function Table(props) {

    const headers = props.headers ? props.headers : [];
    const [data, setData] = React.useState(props.data ? props.data : []);
    const [ready, setReady] = React.useState(false);
    const type = props.type ? props.type : 'drivers';
    const selRace = props.race ? props.race : null;

    // Calculate drivers' points and sort them
    React.useEffect(() => {
        if (!ready) {
            if (type === 'drivers') {
                // Drivers' standing
                let newData = data;
                for (let driver of newData) {
                    driver.points = calcDriverPoints(driver.DID);
                }
    
                newData = newData.sort((a, b) => b.points - a.points);
                setData([...newData]);
                setReady(true);
            }
            
            if (type === 'teams') {
                // Constructions' stadings
                let newData = data;
                for (let team of newData) {
                    team.points = calcTeamPoints(team.TID);
                }

                newData = newData.sort((a, b) => b.points - a.points);
                setData([...newData]);
                setReady(true);
            }

        }

    }, [data, ready, type]);

    // Format selected race result
    React.useEffect(() => {
        if (type === 'results') {
            const race = races.races.find(item => item.name === selRace);
            let newData = [];
    
            if (race) {
                for (let driver of race.result) {
                    const d = drivers.drivers.find(item => item.DID === driver);
                    newData.push({
                        name: d.name,
                        team: d.team,
                        DID: d.DID
                    });
                }
            }

            setData([...newData]);
        }

    }, [selRace, type]);



    return (
        <TableRB style={styles.table} borderless>
            <thead>
                <tr style={styles.tableHeader}>
                    {headers.map((item, index) => {
                        return th(index, item);
                    })}
                </tr>
            </thead>
            <tbody>
                    {data.map((item, index) => {
                        return td(index, item, type, selRace);
                    })}
            </tbody>
        </TableRB>
    );
}

// table header row
function th(index, text) {
    return (
        <th key={index}
            style={{textAlign: text === 'Points' ? 'right' : 'left'}}
        >
            {text}
        </th>
    );
}

// table data row
function td(index, data, t, selRace) {
    const type = t ? t : null;

    if (type === 'drivers') {
        return tdDriver(index, data);
    }
    if (type === 'teams') {
        return tdTeam(index, data);
    }
    if (type === 'results') {
        return tdResult(index, data, selRace);
    }
}

// driver data row
function tdDriver(index, data) {
    return (
        <tr key={index}
            style={
                {...styles.tableDataRow, background: index % 2 === 0 ? '#fff' : '#f5f5f5'}
            }
        >
            <td>{index + 1}</td>
            <td><b>{data.name}</b></td>
            <td>{data.team}</td>
            <td style={{textAlign: 'right'}}>{data.points}</td>
        </tr>
    );
}

// team data row
function tdTeam(index, data) {
    return (
        <tr key={index}
            style={
                {...styles.tableDataRow, background: index % 2 === 0 ? '#fff' : '#f5f5f5'}
            }
        >
            <td>{index + 1}</td>
            <td><b>{data.name}</b></td>
            <td style={{textAlign: 'right'}}>{data.points}</td>
        </tr>
    );
}

// result data row
function tdResult(index, data, selRace) {
    const fastestLap = races.races.find(race => race.name === selRace).fastestLap;
    let fLapPoint = false;

    if (fastestLap.driver === data.DID && fastestLap.position < 11) {
        fLapPoint = true;
    }

    return (
    <tr key={index}
        style={
            {...styles.tableDataRow, background: index % 2 === 0 ? '#fff' : '#f5f5f5'}
        }
    >
        <td>{index + 1}</td>
        <td><b>{data.name}</b></td>
        <td>{data.team}</td>
        <td style={{textAlign: 'right'}}>{pointsSys.ptsSys[index] + (fLapPoint ? 1 : 0)}</td>
    </tr>
    );
}

// Calculate points for driver
// param DID driver id example: 'HAM'
// return points
function calcDriverPoints(DID) {
    let points = 0;

    for (let race of races.races) {
        const index = race.result.findIndex(result => result === DID);
        if (index !== -1) {
            points += pointsSys.ptsSys[index];
        }
        if (race.fastestLap.driver === DID && race.fastestLap.position < 11) {
            points += 1;
        }
    }

    return points;
}

// Calculate team points
// param TID team id example: 'MER'
// return points
function calcTeamPoints(TID) {
    let points = 0;
    
    for (let driver of drivers.drivers) {
        if (driver.TID === TID) {
            points += calcDriverPoints(driver.DID);
        }
    }

    return points;
}


