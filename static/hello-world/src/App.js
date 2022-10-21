import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import TableTree from '@atlaskit/table-tree';
import Button from '@atlaskit/button';
import staticData from './data/data.json';

const projectName = 'TEST';
const issueLinkName = `Parent of`;
async function fetchData() {
    const params = `issueLinkType = ${issueLinkName} and project=${projectName}`;
    const response = await requestJira(`/rest/api/2/search?jql=${params}`);
    console.log('===============================================================call api jira');
    const data = await response.json();
    console.log(data);
}
// const data = async () => {
//     const params = `issueLinkType = ${issueLinkName} and project=${projectName}`;
//     const response = await requestJira(`/rest/api/2/search?jql=${params}`);
//     console.log('===============================================================call api jira');
// };

// const issueData = data().then((result) => {
//     let data = [];
//     result.issues.forEach((element) => {
//         data.push({
//             label: element.key, value: element.key, visible: true,
//         });
//     });

//     return data;
// });

/* eslint react/no-unused-prop-types: 0 */
type ExampleItemData = { type: string, summary: string, status: string };

const Type = (props: ExampleItemData) => <span>{props.type}</span>;
const Summary = (props: ExampleItemData) => <span>{props.summary}</span>;
const Status = (props: ExampleItemData) => <span>{props.status}</span>;

function App() {
    fetchData();
    return (
        <div>
            <TableTree
                headers={['Type', 'Summary', 'Status']}
                columns={[Type, Summary, Status]}
                columnWidths={['100px', '400px', '100px']}
                items={staticData.children}
            />
            <br></br>
            <Button appearance="primary" onclick="fetchData()">Primary button</Button>
        </div>
    );
}

export default App;
