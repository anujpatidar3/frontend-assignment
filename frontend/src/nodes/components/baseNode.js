// src/nodes/BaseNode.js
import { Handle } from 'reactflow';
import { inputContainerStyle, descriptionStyle, containerStyle as baseContainerStyle, labelStyle as baseLabelStyle } from './styles.js'

export const BaseNode = ({
    id,
    fields,
    setFields,
    label,
    handles,
    inputs,
    description,
    style,
    nodeSize,
    inputRef
}) => {

    const containerStyle = {
        ...baseContainerStyle,
        border: `${style.border}`
    };

    const labelStyle = {
        ...baseLabelStyle,
        backgroundColor: `${style.backgroundColor}`
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
                                className='input-text'
                                value={fields[field] || ""}
                                onChange={handleChange(field)}
                            />
                        )}
                        {type === "textarea" && (
                            <textarea
                                ref={inputRef}
                                value={fields[field] || ""}
                                onChange={handleChange(field)}
                                className='textarea'
                                style={{
                                    width: "100%",
                                    boxSizing: "border-box",
                                    height: `${Math.max(nodeSize.height - 40, 40)}` + "px",
                                }}
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