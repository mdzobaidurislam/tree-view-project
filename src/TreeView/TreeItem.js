import { useState } from "react";

const TreeItem = ({ item, level = 0, onUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [itemData, setItemData] = useState(item);

  const handleChange = (field, value) => {
    const newData = { ...itemData, [field]: value };
    setItemData(newData);
    onUpdate(newData);
  };

  const isNode = item.children && !item.value;
  const itemClass = `tree-item ${isNode ? "node" : item.isEditable ? "editable" : "non-editable"}`;
  const backgroundColor = isNode ? "lightblue" : item.isEditable ? "white" : "lightgray";

  return (
    <div>
      <div
        className={itemClass}
        style={{ marginLeft: `${level * 20}px`, backgroundColor }}
      >
        {isNode && (
          <span
            className="collapse-icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "▶" : "▼"}
          </span>
        )}

        <span className="item-label">{itemData.label}:</span>

        {!isNode && (
          item.isEditable ? (
            itemData.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={Boolean(itemData.value)}
                onChange={(e) => handleChange("value", e.target.checked)}
                style={{ marginLeft: "10px" }}
              />
            ) : (
              <input
                type={itemData.type}
                value={itemData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                style={{
                  backgroundColor: item.isEditable ? "white" : "lightgray",
                }}
              />
            )
          ) : (
            <span
              className="item-value"
              style={{ backgroundColor: "lightgray" }}
            >
              {itemData.value?.toString()}
            </span>
          )
        )}
      </div>

      {!isCollapsed &&
        item.children?.map((child) => (
          <TreeItem
            key={child.id} // Using a unique identifier for stability
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
