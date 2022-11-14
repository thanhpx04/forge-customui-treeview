import React, { useCallback, useState } from 'react';
import { requestJira } from '@forge/bridge';
import TableTree, { Cell, Header, Headers, Row, Rows, TableTreeDataHelper, } from '@atlaskit/table-tree';
import DropdownMenu, { DropdownItemCheckbox, DropdownItemCheckboxGroup } from '@atlaskit/dropdown-menu';
import Button from '@atlaskit/button';
// import Textfield from '@atlaskit/textfield';
import AddIcon from '@atlaskit/icon/glyph/add'
import EditIcon from '@atlaskit/icon/glyph/edit'
import staticData from './data/dataArrayType.json';
// import sampleData from './data/sampleData.json';
import { fetchNewItems } from './data/getDefaultItems.js';

const tableTreeHelper = new TableTreeDataHelper({ key: 'issuekey' });

const loadTreeData = () => {
    return tableTreeHelper.updateItems(staticData);
};

function App() {
    const [dataMaster, setChecked] = useState({
        issuekey: {
            header: 'Issue Key',
            width: '250px',
            isDisplay: true
        },
        type: {
            header: 'Type',
            width: '200px',
            isDisplay: true
        },
        summary: {
            header: 'Summary',
            width: '400px',
            isDisplay: true
        },
        status: {
            header: 'Status',
            width: '200px',
            isDisplay: true
        },
        actions: {
            header: 'Actions',
            width: '200px',
            isDisplay: true
        }
    });
    const [itemsRow, setItemsRow] = useState(loadTreeData);
    const [currentAdding, setCurrentAdding] = useState('0');

    const getDisplayItems = (dataMaster) => {
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

    const addRowHandler = useCallback((currentItem) => {
        console.log('currentItem');
        console.log(currentItem);
        fetchNewItems().then((newItems) => {
            console.log('newItems');
            console.log(newItems);
            setItemsRow((items) =>
                tableTreeHelper.appendItems(newItems, items, currentItem),
            );
        });
    }, []);
    // = (item) => {
    //     console.log("add");
    //     console.log(item);
    //     // let index = itemsRow.findIndex(item => item.issuekey === issuekey);
    //     // console.log(index);
    //     setItems((itemsRow) =>
    //         tableTreeHelper.appendItems(sampleData, itemsRow, item)
    //     );
    //     // setCurrentAdding(issuekey);
    // }

    const editRowHandler = (issuekey) => {
        console.log("edit");
        console.log(issuekey);
    }
    return (
        <div>
            <TableTree>
                <Headers>
                    {getDisplayItems(dataMaster).map((item) => {
                        return (
                            <Header width={item.width}>{item.header}</Header>
                        );
                    })}
                </Headers>
                <Rows
                    items={itemsRow}
                    render={({ issuekey, type, summary, status, children = [] }) =>
                        issuekey === currentAdding ? (
                            <Button appearance="primary">Retry</Button>
                        ) : (
                            <Row itemId={issuekey} items={children} hasChildren={children.length > 0}>
                                <Cell>{issuekey}</Cell>
                                <Cell>{type}</Cell>
                                <Cell>{summary}</Cell>
                                <Cell>{status}</Cell>
                                <Cell>
                                    <Button iconBefore={<AddIcon label="" />} appearance="subtle" onClick={(e) => addRowHandler({ issuekey, type, summary, status, children })}></Button>
                                    <Button iconBefore={<EditIcon label="" />} appearance="subtle" onClick={(e) => editRowHandler(issuekey)}></Button>
                                </Cell>
                            </Row>
                        )}
                />
            </TableTree>
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
