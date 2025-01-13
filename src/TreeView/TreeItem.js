import { useState } from "react";

const TreeItem = ({ isSaveData = false, item, level = 0, onUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [itemData, setItemData] = useState(item);

  const handleChange = (field, value) => {
    const newData = { ...itemData, [field]: value };
    setItemData(newData);
    onUpdate(newData);
  };

  const isNode = item.children  &&  !item.value  ;
  console.log("isNode",isNode)
  const itemClass = `tree-item ${itemData.label} ${isNode && item.children.length > 0  ? "node" : item.isEditable ? "editable" : "non-editable"}`;

  return (
    <div>
      <div
        className={itemClass}
        style={{ paddingLeft: `${level===2 ? (2 * 30)+40 : 60}px` }}
      >
        {isNode && item.children.length > 0 && (
          <span
            className="collapse-icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "▶" : "▼"}
          </span>
        )}

        <span className="item-label">{itemData.label}:</span>
        {
          itemData.type === "checkbox" && (
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                disabled={isSaveData}
                checked={Boolean(itemData.value)}
                onChange={(e) => handleChange("value", e.target.checked)}
              />
              <span className="checkbox-label">
                {itemData.value ? "Yes" : "No"}
              </span>
            </label>
          )
        }
        {!isNode && (
          <div className="form-control">
            {item.isEditable ? (
              itemData.type === "select" ? (
                <select
                  className="select-input"
                  disabled={isSaveData}
                  value={itemData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                >
                  {itemData.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                {itemData.type === "text"  &&
                <input
                  className="text-input"
                  type="text"
                  disabled={isSaveData}
                  value={itemData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                />}
                 {itemData.type === "number"  &&
                <input
                  className="text-input"
                  type="number"
                  disabled={isSaveData}
                  value={itemData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                />}
                </>
              )
            ) : (
              <span className="item-value">
                {itemData.value?.toString()}
              </span>
            )}
          </div>
        )}
      </div>

      {!isCollapsed && item.children?.map((child) => (
        <TreeItem
          key={child.id}
          isSaveData={isSaveData}
          item={child}
          level={level + 1}
          onUpdate={(updatedChild) => {
            const newChildren = [...item.children];
            const childIndex = newChildren.findIndex((c) => c.id === child.id);
            newChildren[childIndex] = updatedChild;
            handleChange("children", newChildren);
          }}
        />
      ))}
    </div>
  );
};

export default TreeItem;