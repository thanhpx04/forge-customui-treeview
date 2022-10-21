import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import TableTree from '@atlaskit/table-tree';
import staticData from './data/data.json';

const projectName = 'TEST';
const issueLinkName = `Parent of`;
const data = async () => {
    const params = `issueLinkType = ${issueLinkName} and project=${projectName}`;
    const response = await requestJira(`/rest/api/2/search?jql=${params}`);
    console.log('call api jira');
    return await response.json();
};

const issueData = data().then((result) => {
    let data = [];
    console.log(result)
    result.issues.forEach((element) => {
        data.push({
            label: element.key, value: element.key, visible: true,
        });
    });

    return data;
});

/* eslint react/no-unused-prop-types: 0 */
type ExampleItemData = { type: string, summary: string, status: string };

const Type = (props: ExampleItemData) => <span>{props.type}</span>;
const Summary = (props: ExampleItemData) => <span>{props.summary}</span>;
const Status = (props: ExampleItemData) => <span>{props.status}</span>;

function App() {
    return (
        <div>
            <TableTree
                headers={['Type', 'Summary', 'Status']}
                columns={[Type, Summary, Status]}
                columnWidths={['100px', '400px', '100px']}
                items={staticData.children}
            />
            <br></br>
            <Button appearance="primary">Primary button</Button>
        </div>
    );
}

export default App;
