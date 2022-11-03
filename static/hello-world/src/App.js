import React, { useEffect, useState } from 'react';
import { requestJira } from '@forge/bridge';
import TableTree from '@atlaskit/table-tree';
import DropdownMenu, { DropdownItemCheckbox, DropdownItemCheckboxGroup } from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add'
import EditIcon from '@atlaskit/icon/glyph/edit'
import staticData from './data/data.json';

// const projectName = 'TEST';
// const issueLinkName = 'Parent of';
// async function fetchData() {
//     const params = `issueLinkType = ${issueLinkName} and project=${projectName}`;
//     const response = await requestJira(`/rest/api/2/search?jql=${params}`);
//     console.log('===============================================================call api jira');
//     const data = await response.json();
//     console.log(data);
// }

const IssueKey = (content) => <span>{content.issuekey}</span>;
const Type = (content) => <span>{content.type}</span>;
const Summary = (content) => <span>{content.summary}</span>;
const Status = (content) => <span>{content.status}</span>;
const Actions = (content) =>
    <div>
        <Button iconBefore={<AddIcon label="" />} appearance="subtle" onClick={handleAdd}></Button>
        <Button iconBefore={<EditIcon label="" />} appearance="subtle" onClick={handleEdit}></Button>
    </div>;

function handleAdd() {
    console.log("a");
}

function handleEdit() {
    console.log("b");
}

function App() {
    let listMaster = [
        {
            header: 'Issue Key',
            cell: IssueKey,
            width: '200px',
            isDisplay: true
        },
        {
            header: 'Type',
            cell: Type,
            width: '200px',
            isDisplay: true
        },
        {
            header: 'Summary',
            cell: Summary,
            width: '400px',
            isDisplay: true
        },
        {
            header: 'Status',
            cell: Status,
            width: '200px',
            isDisplay: true
        },
        {
            header: 'Actions',
            cell: Actions,
            width: '200px',
            isDisplay: true
        }
    ];

    let [listHeaders, setHeaders] = useState(listMaster.map(item => item.header));
    let [listColumnWidths, setColumnWidths] = useState(listMaster.map(item => item.width));
    let [listColumns, setColumns] = useState([IssueKey, Type, Summary, Status, Actions]);
    let [checked, setChecked] = useState({ issuekey: true, type: true, summary: true, status: true });

    const toggle = (name) => {
        switch (name) {
            case 'issuekey':
                listMaster[0].isDisplay = !checked['issuekey'];
                listMaster[1].isDisplay = checked['type'];
                listMaster[2].isDisplay = checked['summary'];
                listMaster[3].isDisplay = checked['status'];
                break;
            case 'type':
                listMaster[0].isDisplay = checked['issuekey'];
                listMaster[1].isDisplay = !checked['type'];
                listMaster[2].isDisplay = checked['summary'];
                listMaster[3].isDisplay = checked['status'];
                break;
            case 'summary':
                listMaster[0].isDisplay = checked['issuekey'];
                listMaster[1].isDisplay = checked['type'];
                listMaster[2].isDisplay = !checked['summary'];
                listMaster[3].isDisplay = checked['status'];
                break;
            case 'status':
                listMaster[0].isDisplay = checked['issuekey'];
                listMaster[1].isDisplay = checked['type'];
                listMaster[2].isDisplay = checked['summary'];
                listMaster[3].isDisplay = !checked['status'];
                break;
            default:
                break;
        }
        setChecked((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));

        setHeaders(listMaster.filter(item => item.isDisplay == true).map(item => item.header));
        setColumnWidths(listMaster.filter(item => item.isDisplay == true).map(item => item.width));
        setColumns(listMaster.filter(item => item.isDisplay == true).map(item => item.cell));
    };
    return (
        <div>
            <TableTree
                headers={listHeaders}
                columnWidths={listColumnWidths}
                columns={listColumns}
                items={staticData.children}
            />
            <p></p>
            <DropdownMenu trigger="Select display columns">
                <DropdownItemCheckboxGroup title="Column" id="actions">
                    <DropdownItemCheckbox id="issuekey" onClick={(e) => toggle('issuekey')} isSelected={checked['issuekey']}>Issue Key</DropdownItemCheckbox>
                    <DropdownItemCheckbox id="type" onClick={(e) => toggle('type')} isSelected={checked['type']}>Type</DropdownItemCheckbox>
                    <DropdownItemCheckbox id="summary" onClick={(e) => toggle('summary')} isSelected={checked['summary']}>Summary</DropdownItemCheckbox>
                    <DropdownItemCheckbox id="status" onClick={(e) => toggle('status')} isSelected={checked['status']}>Status</DropdownItemCheckbox>
                </DropdownItemCheckboxGroup>
            </DropdownMenu>
        </div>
    );
}

export default App;
