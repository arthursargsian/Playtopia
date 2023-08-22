import React, {useCallback} from "react";
import {useSearchParams} from "react-router-dom";
import {paymentConfirm} from "../../redux/actions/payment";
import NavBar from "../../components/main/navigation/NavBar";
import Button from "../../components/common/Button";
import {useDispatch, useSelector} from "react-redux";
import {pathFile} from "../../Utils";
import {saveAs} from "file-saver";
import {BiSolidDownload} from "react-icons/bi";

function Confirm() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const {payment_intent} = Object.fromEntries([...searchParams]);

    const torrent = useSelector((store) => store.payment.torrent);
    const torrentName = useSelector((store) => store.payment.torrentName);

    const handleDownload = useCallback(async () => {
        dispatch(paymentConfirm(payment_intent));
        try {
            const response = await fetch(pathFile(torrent));
            const blob = await response.blob();
            saveAs(blob, `${torrentName}.torrent`);
        } catch (error) {
            console.error(error);
        }
    }, [payment_intent, torrent, torrentName]);

    return (
        <>
            <NavBar/>
            <Button variant={"download-btn buy"} onClick={handleDownload}><BiSolidDownload/> <span>Download</span></Button>
        </>
    );
}

export default Confirm;
