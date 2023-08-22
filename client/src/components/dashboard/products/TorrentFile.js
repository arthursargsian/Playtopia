import React, {useCallback, useEffect, useState} from "react";
import {ReactComponent as Upload} from "../../../assets/img/svg/upload.svg";
import {showToast} from "../../../Utils";
import {useDispatch, useSelector} from "react-redux";
import {torrent} from "../../../redux/actions/rest";

function TorrentFile({state, name}) {
    const dispatch = useDispatch();
    const [torrentStatus, setTorrentStatus] = useState(false);
    const [torrentFile, setTorrentFile] = useState([]);
    const [torrentName, setTorrentName] = useState("Upload Torrent");
    const addProductStatus = useSelector((store) => store.products.addProductStatus);

    useEffect(() => {
        dispatch(torrent(torrentFile));
        if (addProductStatus === "success") {
            setTorrentStatus(false);
            setTorrentName("Upload Torrent");
            setTorrentFile([]);
        }
        if (state === "update") {
            setTorrentStatus(true);
            setTorrentName(name);
        }
    }, [dispatch, torrentFile, addProductStatus]);

    const handleTorrentFile = useCallback((ev) => {
        const [file] = ev.target.files;
        if (file) {
            setTorrentStatus(true);
            setTorrentName(file.name);
            setTorrentFile(file);
        }
        if (!file) {
            showToast("fail", "No file selected");
            return;
        }
        const validExtensions = [".torrent"];
        const validMimeTypes = ["application/x-bittorrent"];
        const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
        const fileMimeType = file.type.toLowerCase();

        if (!validExtensions.includes(fileExtension) || !validMimeTypes.includes(fileMimeType)) {
            showToast("fail", "Invalid torrent file. Please select a valid torrent file.");
        }
    }, []);
    return (
        <>
            <input onChange={(ev) => handleTorrentFile(ev)} id="torrent" type="file" className="upload"/>
            <label title={torrentName} htmlFor="torrent"
                   className={`add-product ${torrentStatus ? "active-torrent" : null}`}>
                <span><Upload/></span> Upload Torrent
            </label>
        </>
    );
}

export default TorrentFile;
