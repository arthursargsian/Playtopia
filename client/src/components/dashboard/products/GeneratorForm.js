import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../../redux/actions/categories";
import Select from "react-select";
import {generatorProductForm} from "../../../redux/actions/rest";
import moment from "moment";

function GeneratorForm({state, singleData}) {
    const dispatch = useDispatch();
    const [generatorForm, setGeneratorForm] = useState({
        name: "", desc: "", price: "", disc_price: "", year: "", company: "", genre_name: "", videocard: "", processor: "", ram: "", disk_space: ""
    });

    const categories = useSelector((store) => store.categories.categories);
    const addProductStatus = useSelector((store) => store.products.addProductStatus);

    useEffect(() => {
        dispatch(generatorProductForm(generatorForm));
    }, [dispatch, generatorForm]);

    useEffect(() => {
        dispatch(getCategories());
        if (addProductStatus === "success") {
            setGeneratorForm({
                name: "", desc: "", price: "", disc_price: "", year: "", company: "", genre_name: "", videocard: "", processor: "", ram: "", disk_space: ""
            });
        }
    }, [dispatch, addProductStatus]);

    useEffect(() => {
        if (state === "update" && singleData) {
            setGeneratorForm({
                ...singleData,
                genre_name: singleData.genres[0].name,
            });
        }
    }, [state, singleData]);

    const handleGeneratorForm = useCallback((key, value) => {
        setGeneratorForm((prev) => ({
            ...prev,
            [key]: value
        }))
    }, []);

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'transparent' : provided.backgroundColor,
            color: state.isFocused ? 'inherit' : provided.color,
        }),
    };

    const selectedGenre = categories.find((option) => option.name === generatorForm.genre_name);

    return (
        <>
            <main className="generator-form">
                <form>
                    <div className="column-form">
                        <div className="first-column">
                            <input required onChange={(ev) => handleGeneratorForm("name", ev.target.value)} value={generatorForm.name} className="generator-input" type="text" placeholder="Title"/>
                            <Select styles={customStyles} classNamePrefix="generator-input" getOptionValue={(option) => option.id} getOptionLabel={(option) => option.name} onChange={(ev) => handleGeneratorForm("genre_name", ev.name)}
                                    options={categories} id="genre" value={selectedGenre}
                            />
                            <div className="txt-2x">
                                <input required onChange={(ev) => handleGeneratorForm("company", ev.target.value)} value={generatorForm.company} className="generator-input" type="text" placeholder="Company"/>
                                <input required onChange={(ev) => handleGeneratorForm("year", moment(ev.target.value).format("YYYY-MM-DD"))} value={moment(generatorForm.year).format("YYYY-MM-DD")} className="generator-input" type="date" placeholder="Year"/>
                            </div>
                            <div className="txt-2x">
                                <input required onChange={(ev) => handleGeneratorForm("price", ev.target.value)} value={generatorForm.price} className="generator-input" type="number" placeholder="Price"/>
                                <input required onChange={(ev) => handleGeneratorForm("disc_price", ev.target.value)} value={generatorForm.disc_price} className="generator-input" type="number" placeholder="Disc Price"/>
                            </div>
                        </div>
                        <div className="second-column">
                            <input required onChange={(ev) => handleGeneratorForm("videocard", ev.target.value)} value={generatorForm.videocard} className="generator-input" type="text" placeholder="Videocard"/>
                            <input required onChange={(ev) => handleGeneratorForm("processor", ev.target.value)} value={generatorForm.processor} className="generator-input" type="text" placeholder="Processor"/>
                            <input required onChange={(ev) => handleGeneratorForm("ram", ev.target.value)} value={generatorForm.ram} className="generator-input" type="text" placeholder="Ram"/>
                            <input required onChange={(ev) => handleGeneratorForm("disk_space", ev.target.value)} value={generatorForm.disk_space} className="generator-input" type="text" placeholder="Disk space"/>
                        </div>
                    </div>
                    <textarea onChange={(ev) => handleGeneratorForm("desc", ev.target.value)} value={generatorForm.desc} placeholder="Game Description" className="generator-input"></textarea>
                </form>
            </main>
        </>
    );
}

export default GeneratorForm;
