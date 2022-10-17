import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import TableTree from '@atlaskit/table-tree';
import staticData from './data/data.json';

/* eslint react/no-unused-prop-types: 0 */
type ExampleItemData = { type: string, summary: string, status: string };

const Type = (props: ExampleItemData) => <span>{props.type}</span>;
const Summary = (props: ExampleItemData) => <span>{props.summary}</span>;
const Status = (props: ExampleItemData) => <span>{props.status}</span>;

function App() {
    return (
        <TableTree
            headers={['Type', 'Summary', 'Status']}
            columns={[Type, Summary, Status]}
            columnWidths={['100px', '400px', '100px']}
            items={staticData.children}
        />
    );
}

export default App;
