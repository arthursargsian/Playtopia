import React from "react";

function TableHeader() {
    return (
        <>
            <tr>
                <th><p>Avatar</p></th>
                <th><p>Title</p></th>
                <th><p>Price</p></th>
                <th><p>Disc Price</p></th>
                {window.screen.availWidth >= 869 ? <th><p>Rating</p></th> : null}
                <th><p>Update</p></th>
                <th><p>Delete</p></th>
            </tr>
        </>
    );
}

export default TableHeader;
