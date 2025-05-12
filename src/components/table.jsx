import React from "react";

const Table = ({ columns = [], orders = [],className = null }) => {
    if (!Array.isArray(columns) || columns.length === 0) {
        return <p>No columns defined.</p>;
    }

    if (!Array.isArray(orders)) {
        return <p>Invalid data provided.</p>;
    }

    return (
        <table className={className && className}>
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index} className="fw-6">
                            {col.label || col.key}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length}>No orders available.</td>
                    </tr>
                ) : (
                    orders.map((order, rowIndex) => (
                        <tr className="tf-order-item" key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.key === "actions" ? (
                                        <a
                                            href={order?.link || "#"}
                                            className="tf-btn btn-fill animate-hover-btn rounded-0 justify-content-center"
                                        >
                                            <span>View</span>
                                        </a>
                                    ) : col.key === "total" ? (
                                        `${order?.total ?? 0} for ${order?.items ?? 0} items`
                                    ) : (
                                        order?.[col.key] ?? "—"
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default Table;
