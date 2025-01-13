import TreeView from "./TreeView";

export default function TreeViewData() {
    const sampleData = [
        {
            id: 1,
            label: 'Office',
            children: [
                { id: 101, label: 'Address', value: '1234 Main Street, Austin, TX', type: 'text', isEditable: true },
                { id: 102, label: 'Phone', value: '(512) 555-0123', type: 'text', isEditable: true },
                { id: 103, label: 'Operating Hours', value: '9:00 AM - 5:00 PM', type: 'text', isEditable: true }
            ]
        },
        {
            id: 2,
            label: 'Supplies',
            children: [
                { id: 201, label: 'Paper Stock', value: '500', type: 'number', step: 10, isEditable: true },
                { id: 202, label: 'Ink Cartridges', value: '50', type: 'number', step: 1, isEditable: true }

            ]
        },
        {
            id: 3,
            label: 'Equipment',
            children: [
                { id: 301, label: 'Name', value: 'Refrigerator', type: 'text', isEditable: true },
                { id: 302, label: 'Model', value: 'FR-2023-4D', type: 'text', isEditable: true },
                { id: 303, label: 'Type', value: '4-Door', type: 'select', options: ['2-Door', '3-Door', '4-Door', '5-Door'], isEditable: true },
                { id: 304, label: 'Temperature', value: '38', type: 'number', step: 0.5, isEditable: true },
                { id: 305, label: 'Available', value: false, type: 'checkbox', isEditable: true },
                { id: 306, label: 'Cost', value: '2345.15', type: 'number', step: 0.01, isEditable: true },
                {
                    id: 307,
                    label: 'Parts',
                    children: [
                        { id: 401, label: 'Color', value: 'Grey', type: 'select', options: ['White', 'Grey', 'Black', 'Stainless'], isEditable: true },
                        { id: 402, label: 'Manufacturer', value: 'Fridgedair', type: 'text', isEditable: false },
                        { id: 403, label: 'Support Phone', value: '(800) 231-1212', type: 'text', isEditable: true }
                    ]
                }
            ]
        }
    ];

    const handleSave = (updatedData) => {
        console.log('Saving changes:', updatedData);
        alert('Changes saved successfully!');
    };

    return (
        <div style={{
            width: "650px",
            margin: "auto"
        }}>
            <TreeView data={sampleData} onSave={handleSave} />
        </div>
    );
}
