import React, {useCallback} from "react";
import NavBar from "../../components/main/navigation/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import Button from "../../components/common/Button";
import {paymentConfirmBasket} from "../../redux/actions/payment";
import {pathFile} from "../../Utils";
import {saveAs} from "file-saver";
import {BiSolidDownload} from "react-icons/bi";

function ConfirmBasket() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const {payment_intent} = Object.fromEntries([...searchParams]);

    const torrents = useSelector((store) => store.payment.torrents);
    const torrentsStatus = useSelector((store) => store.payment.torrentsStatus);

    const handleDownload = useCallback(() => {
        dispatch(paymentConfirmBasket(payment_intent));
        if (torrentsStatus === "success") {
            try {
                JSON.parse(torrents).forEach(async (item) => {
                    const response = await fetch(pathFile(item));
                    const blob = await response.blob();
                    saveAs(blob, item);
                });
            } catch (error) {
                console.log(error);
            }
        }
    }, [payment_intent, torrents, torrentsStatus]);

    return (
        <>
            <NavBar/>
            <Button variant={"download-btn buy"} onClick={handleDownload}><BiSolidDownload/> <span>Download</span></Button>
        </>
    );
}

export default ConfirmBasket;
