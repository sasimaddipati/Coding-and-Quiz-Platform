
import React, { createContext, useState } from 'react';
const MyContext = createContext();
const MyProvider = ({ children }) => {
    const [value, setValue] = useState("Hello, World!");
    const [crequiz,setcrequiz]=useState([]);
    const [crecontest,setcrecontest]=useState([]);
    const [upcoming,setupcoming]=useState([])
    const [userloginstatus,setuserloginstatus]=useState(false);
    const [username,setusername]=useState('');
    const [currentzone,setcurrentzone]=useState('');
    const [edititem,setedititem]=useState({});
    const [zoneid,setzoneid] = useState({});
    const [currentitemname,setcurrentitemname]=useState("");
    const [skillquizattempt,setskillquizattempt]=useState([]);
    return (
        <MyContext.Provider value={{skillquizattempt,setskillquizattempt,currentitemname,setcurrentitemname,zoneid,setzoneid,edititem,setedititem,currentzone,setcurrentzone,username,setusername,userloginstatus,setuserloginstatus,upcoming,setupcoming,value, setValue ,crequiz,crecontest,setcrecontest,setcrequiz }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
