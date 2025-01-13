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
const TreeView = ({title="",isSaveData=false, data, onSave }) => {
  const [treeData, setTreeData] = useState(data);

  const [searchTerm, setSearchTerm] = useState('');
  const [originalData, setOriginalData] = useState(JSON.stringify(data));
  const [hasChanges, setHasChanges] = useState(false);

  const shouldShow = (itemData) => {
    if (!searchTerm) return true;
    return itemData.label?.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // const filterData = (items) => {
  //   return items.reduce((filteredItems, item) => {
  //     if (shouldShow(item)) {
  //       const filteredChildren = item.children ;
  //       filteredItems.push({ ...item, children: filteredChildren });
  //     }
  //     return filteredItems;
  //   }, []);
  // };

  const filterData = (items) => {
    return items
      .map(item => {
        const shouldShowItem = shouldShow(item);

        // Filter children if needed
        const children = item.children ? filterData(item.children) : [];

        // Include the item if it matches or has matching children
        if (shouldShowItem || children.length > 0) {
          return { ...item, children }; // Pass along filtered children
        }
        return null;
      })
      .filter(Boolean); // Remove null values
  };


  const filteredData = useMemo(() => filterData(treeData), [searchTerm, treeData]);


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
      {
        title && <h3>{title}</h3>
      }
      {
        !isSaveData &&

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
       }

      {filteredData.map((item) => (
        <TreeItem
          isSaveData={isSaveData}
          key={item.id} // Ensuring unique IDs
          item={item}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TreeView;
