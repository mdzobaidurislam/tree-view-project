import { useState } from "react";

const TreeItem = ({isSaveData=false, item, level = 0, onUpdate }) => {
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

  console.log("isSaveData",isSaveData)
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
        disabled={isSaveData}
        type="checkbox"
        checked={Boolean(itemData.value)}
        onChange={(e) => handleChange("value", e.target.checked)}
        style={{ marginLeft: "10px" }}
      />
    ) : itemData.type === "select" ? (
      <select
      disabled={isSaveData}
        value={itemData.value}
        onChange={(e) => handleChange("value", e.target.value)}
        style={{
          backgroundColor: item.isEditable ? "white" : "lightgray",
          marginLeft: "10px",
        }}
      >
        {itemData.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : (
      <input
        disabled={isSaveData}
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
            isSaveData={isSaveData}
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
