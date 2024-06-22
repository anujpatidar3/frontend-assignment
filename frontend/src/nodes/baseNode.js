// src/nodes/BaseNode.js
import { Handle } from 'reactflow';

export const BaseNode = ({ id, fields, setFields, label, handles, inputs, description, style }) => {

    const containerStyle = {
        width: 250,
        height: "auto",
        borderRadius: "5px",
        border: `${style.border}`
    }

    const labelStyle = {
        textAlign: "left",
        padding: "10px",
        fontSize: "1em",
        fontWeight: 700,
        color: "#000000",
        backgroundColor: `${style.backgroundColor}`
    };

    const descriptionStyle = {
        padding: "10px",
        marginTop: "5px",
        fontSize: "1em",
        color: "#333333",
        fontWeight: 500,
    };

    const inputContainerStyle = {
        padding: "10px",
    };

    const handleChange = (field) => (e) => {
        setFields({
            ...fields,
            [field]: e.target.value,
        });
    };

    return (
        <div style={containerStyle}>
            <div style={labelStyle}>
                <span>{label}</span>
            </div>
            {description && description.length && (
                <div style={descriptionStyle}>
                    <span>{description}</span>
                </div>
            )}
            {inputs?.map(({ field, type, options, label }) => (
                <div key={field} style={inputContainerStyle}>
                    <label style={{ fontWeight: 600, fontSize: "1em" }}>
                        {label}
                        {type === "text" && (
                            <input
                                type="text"
                                style={{
                                    padding: "4px",
                                    fontSize: "1em",
                                    border: "1px solid",
                                    borderRadius: "4px",
                                }}
                                value={fields[field] || ""}
                                onChange={handleChange(field)}
                            />
                        )}
                        {type === "select" && (
                            <select
                                value={fields[field] || ""}
                                onChange={handleChange(field)}
                                style={{
                                    width: "150px",
                                    padding: "4px",
                                    fontSize: "1em",
                                    border: "1px solid",
                                    borderRadius: "4px",
                                }}
                            >
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
                <Handle
                    key={id}
                    type={type}
                    position={position}
                    id={id}
                    style={style}
                />
            ))}
        </div>
    );
};
