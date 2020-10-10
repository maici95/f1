


import React from 'react';

import { Table as TableRB } from 'react-bootstrap';

import pointsSys from '../Data/points.json';
import races from '../Data/races.json';

import styles from '../Styles';

export default function Table(props) {

    const headers = props.headers ? props.headers : [];
    const [data, setData] = React.useState(props.data ? props.data : []);
    const [ready, setReady] = React.useState(false);

    // Calculate drivers' points and sort them
    React.useEffect(() => {
        if (!ready) {
            let drivers = data;

            for (let driver of drivers) {
                driver.points = calcPoints(driver.DID);
            }

            drivers = drivers.sort((a, b) => b.points - a.points);
            setData([...drivers]);
            setReady(true);
        }
    }, [data, ready]);


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
                        return td(index, item);
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
function td(index, data) {
    return (
        <tr key={index} style={styles.tableDataRow}>
            <td>{index + 1}</td>
            <td><b>{data.name}</b></td>
            <td>{data.team}</td>
            <td style={{textAlign: 'right'}}>{data.points}</td>
        </tr>
    );
}

// Calculate points for driver
// param DID driver id example: 'HAM'
// return points
function calcPoints(DID) {
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
