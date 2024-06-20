// src/nodes/BaseNode.js
import { useState } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ id, data, label, handles, inputs, description }) => {
    const [fields, setFields] = useState(data || {});

    const handleChange = (field) => (e) => {
        setFields({
            ...fields,
            [field]: e.target.value,
        });
    };
    console.log('fields', fields)
    return (
        <div style={{ width: 200, height: 'auto', border: '1px solid black', padding: '10px' }}>
            <div>
                <span>{label}</span>
            </div>
            {
                description && description.length &&
                <div>
                    <span>{description}</span>
                </div>
            }
            {inputs?.map(({ field, type, options, label }) => (
                <div key={field}>
                    <label>
                        {label}
                        {type === 'text' && (
                            <input type="text" value={fields[field] || ''} onChange={handleChange(field)} />
                        )}
                        {type === 'select' && (
                            <select value={fields[field] || ''} onChange={handleChange(field)}>
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </label>
                </div>
            ))}
            {handles.map(({ type, position, id, style }) => (
                <Handle key={id} type={type} position={position} id={id} style={style} />
            ))}
        </div>
    );
};
