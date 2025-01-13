import React, { useState, useMemo } from 'react';
import './TreeView.css';
import TreeItem from './TreeItem';
const SaveButton = ({ onSave, hasChanges }) => (
  <button
    className={`save-button ${hasChanges ? 'has-changes' : ''}`}
    onClick={onSave}
    disabled={!hasChanges}
  >
    Save Changes
  </button>
);
const TreeView = ({ data, onSave }) => {
  const [treeData, setTreeData] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalData, setOriginalData] = useState(JSON.stringify(data));
  const [hasChanges, setHasChanges] = useState(false);

  const shouldShow = (itemData) => {
    if (!searchTerm) return true;
    return itemData.label?.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const filterData = (items) => {
    return items.reduce((filteredItems, item) => {
      if (shouldShow(item)) {
        const filteredChildren = item.children ;
        filteredItems.push({ ...item, children: filteredChildren });
      }
      return filteredItems;
    }, []);
  };

  const filteredData = useMemo(() => filterData(treeData), [searchTerm, treeData]);
  console.log("filteredData",filteredData)

  const handleUpdate = (updatedItem) => {
    const updateTree = (items, updated) =>
      items.map((item) =>
        item.id === updated.id
          ? updated
          : { ...item, children: item.children }
      );

    const newTreeData = updateTree(treeData, updatedItem);
    setTreeData(newTreeData);
    setHasChanges(JSON.stringify(newTreeData) !== originalData);
  };

  const handleSave = () => {
    setOriginalData(JSON.stringify(treeData));
    setHasChanges(false);
    onSave?.(treeData);
  };

  return (
    <div className="treeview-container">
      <div className="treeview-header">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <SaveButton onSave={handleSave} hasChanges={hasChanges} />
      </div>

      {filteredData.map((item) => (
        <TreeItem
          key={item.id} // Ensuring unique IDs
          item={item}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TreeView;
