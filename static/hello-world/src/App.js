import React, { useEffect, useState } from 'react';
import { requestJira } from '@forge/bridge';
import TableTree from '@atlaskit/table-tree';
import DropdownMenu, { DropdownItemCheckbox, DropdownItemCheckboxGroup } from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add'
import EditIcon from '@atlaskit/icon/glyph/edit'
import staticData from './data/data.json';

function handleAdd() {
    console.log("add");
}

function handleEdit() {
    console.log("edit");
}

const IssueKey = (content) => <span>{content.issuekey}</span>;
const Type = (content) => <span>{content.type}</span>;
const Summary = (content) => <span>{content.summary}</span>;
const StoryPoint = (content) => <span>{content.storypoint}</span>;
const OwnerBy = (content) => <span>{content.ownerby}</span>;
const Status = (content) => <span>{content.status}</span>;

function App() {
    let [dataMaster, setChecked] = useState({
        issuekey: {
            header: 'Issue Key',
            cell: IssueKey,
            width: '270px',
            isDisplay: true
        },
        type: {
            header: 'Type',
            cell: Type,
            width: '200px',
            isDisplay: true
        },
        summary: {
            header: 'Summary',
            cell: Summary,
            width: '400px',
            isDisplay: true
        },
        storypoint: {
            header: 'Story Point',
            cell: StoryPoint,
            width: '200px',
            isDisplay: true
        },
        ownerby: {
            header: 'Owner By',
            cell: OwnerBy,
            width: '200px',
            isDisplay: true
        },
        status: {
            header: 'Status',
            cell: Status,
            width: '200px',
            isDisplay: true
        }
    });

    function getDisplayItems(dataMaster) {
        let result = [];
        for (let key in dataMaster) {
            if (dataMaster[key].isDisplay) {
                result.push(dataMaster[key]);
            }
        }
        return result;
    }

    const toggle = (name) => {
        setChecked((prev) => ({
            ...prev,
            [name]: { ...prev[name], isDisplay: !prev[name].isDisplay },
        }));

    };
    return (
        <div>
            <TableTree
                headers={getDisplayItems(dataMaster).map(i => i.header)}
                columnWidths={getDisplayItems(dataMaster).map(i => i.width)}
                columns={getDisplayItems(dataMaster).map(i => i.cell)}
                items={staticData.children}
            />
            <p></p>
            <DropdownMenu trigger="Select display columns">
                <DropdownItemCheckboxGroup title="Column" id="actions">
                    <DropdownItemCheckbox
                        id="type"
                        onClick={(e) => toggle('type')}
                        isSelected={dataMaster['type'].isDisplay}>
                        Type
                    </DropdownItemCheckbox>
                    <DropdownItemCheckbox
                        id="summary"
                        onClick={(e) => toggle('summary')}
                        isSelected={dataMaster['summary'].isDisplay}>
                        Summary
                    </DropdownItemCheckbox>
                    <DropdownItemCheckbox
                        id="storypoint"
                        onClick={(e) => toggle('storypoint')}
                        isSelected={dataMaster['storypoint'].isDisplay}>
                        Story Point
                    </DropdownItemCheckbox>
                    <DropdownItemCheckbox
                        id="ownerby"
                        onClick={(e) => toggle('ownerby')}
                        isSelected={dataMaster['ownerby'].isDisplay}>
                        Owner By
                    </DropdownItemCheckbox>
                    <DropdownItemCheckbox
                        id="status"
                        onClick={(e) => toggle('status')}
                        isSelected={dataMaster['status'].isDisplay}>
                        Status
                    </DropdownItemCheckbox>
                </DropdownItemCheckboxGroup>
            </DropdownMenu>
        </div>
    );
}

export default App;
