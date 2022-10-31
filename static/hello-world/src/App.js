import React, { useEffect, useState } from 'react';
import { requestJira } from '@forge/bridge';
import TableTree from '@atlaskit/table-tree';
import DropdownMenu, {
    DropdownItemCheckbox,
    DropdownItemCheckboxGroup,
  } from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';
import staticData from './data/data.json';

const projectName = 'TEST';
const issueLinkName = `'Parent of'`;
async function fetchData() {
    const params = `issueLinkType = ${issueLinkName} and project=${projectName}`;
    const response = await requestJira(`/rest/api/2/search?jql=${params}`);
    console.log('===============================================================call api jira');
    const data = await response.json();
    console.log(data);
}

/* eslint react/no-unused-prop-types: 0 */
type ExampleItemData = { type: string, issuekey: string, summary: string, status: string };

const Type = (props: ExampleItemData) => <span>{props.type}</span>;
const IssueKey = (props: ExampleItemData) => <span>{props.issuekey}</span>;
const Summary = (props: ExampleItemData) => <span>{props.summary}</span>;
const Status = (props: ExampleItemData) => <span>{props.status}</span>;

function App() {
    let [listHeaders, setHeaders] = useState(['Type', 'Issue Key', 'Summary', 'Status']);
    let [listColumns, setColumns] = useState([Type, IssueKey, Summary, Status]);
    const [checked, setChecked] = useState<Record<string, boolean>>({
        todo: true,
      });
      const toggle = (name: string) => {
        setChecked((prev) => ({
          ...prev,
          [name]: !prev[name],
        }));
      };
    // setHeaders()
    return (
        <div>
            <DropdownMenu trigger="Status">
                <DropdownItemCheckboxGroup title="Categories" id="actions">
                    <DropdownItemCheckbox
                    id="todo"
                    onClick={(e) => toggle('todo')}
                    isSelected={checked['todo']}
                    >
                    To do
                    </DropdownItemCheckbox>
                    <DropdownItemCheckbox
                    id="inprogress"
                    onClick={(e) => toggle('inprogress')}
                    isSelected={checked['inprogress']}
                    >
                    In progress
                    </DropdownItemCheckbox>
                    <DropdownItemCheckbox
                    id="done"
                    onClick={(e) => toggle('done')}
                    isSelected={checked['done']}
                    >
                    Done
                    </DropdownItemCheckbox>
                </DropdownItemCheckboxGroup>
            </DropdownMenu>
            <p></p>
            <TableTree
                headers={listHeaders}
                columns={listColumns}
                columnWidths={['200px', '200px', '400px', '100px']}
                items={staticData.children}
                />
            <br></br>
            <Button appearance="primary" onclick="fetchData()">Fetch Data</Button>
        </div>
    );
}

export default App;
