import React, {lazy, useEffect, useState} from 'react';
import Sub1 from "./subs/Sub1";
import ReactDynamicImport from "react-dynamic-import";

const Outer = () => {

    const [name, setName] = useState("Sub1");

    const [Dynamic, setDynamic] = useState(null)

    console.log("render...............")




    useEffect(() => {

        if(!name) {
            return
        }

        const loader = () => import(`./subs/${name}.js`);

        import(`./subs/Sub1.js`).then(module => {
            console.log(module)
            const RealComponent = ReactDynamicImport({ loader });

            setDynamic(RealComponent)
            return
        })

    },[name])


    const changeTarget = (name) => {
        setName(name)
    }



    return (
        <div>
            <button onClick={() => changeTarget("Sub1")}>Sub1</button>
            <button onClick={() => changeTarget("Sub2")}>Sub2</button>
            <h1>Outer....</h1>
            {Dynamic && <Dynamic></Dynamic>}
        </div>
    )

};

export default Outer;