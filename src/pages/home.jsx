import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";
import { useEffect, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

export default function Home() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [deletes, setDelete] = useState('');
    
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "massage"));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(), id:doc.id});
        });
        setData(data);
    };

    useEffect(() => {
        getData(); 
    }, [deletes]);

    const searchdata = data.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    });
    const sortedData = searchdata.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
    });

    const handleDelete = async (id)=>{
        await deleteDoc(doc(db, "massage", `${id}`));
        setDelete(id);
    }

    return (
        <div className="w-full min-h-[100vh] bg-slate-800">
            <div className="max-w-[800px] mx-auto h-full">
                <div className="flex justify-between items-center py-3 px-2">
                    <h1 className="text-[25px] font-bold text-white">Portfolio messages</h1>
                    <input onChange={(e) => setSearch(e.target.value)} className="border border-white rounded p-1" type="text" placeholder="search message"/>
                </div>
                <div className="flex flex-col gap-[1px] px-4">
                    <h1 className="text-[20px] font-bold text-white">All Messages ( {searchdata.length} )</h1>
                    {sortedData?.map((item, index) => (
                        <div key={index} className="bg-slate-600 rounded-md border border-white p-3 my-3">
                            <div className="flex justify-between flex-wrap">
                                <p className="font-bold text-white">Gmail: {item.email}</p>
                                <h1 className="text-slate-300 font-bold flex gap-[10px]"><span className="text-white">Tel:</span>{item.number}</h1>
                            </div>
                            <div className="flex justify-between flex-wrap">
                                <h1 className="font-bold text-white">Name: {item.name}</h1>
                                <h1 className="font-bold text-white">Time: {item.soat}</h1>
                            </div>
                            <div className="w-full font-light text-wrap text-white h-[80px] rounded p-1 border border-slate-400">
                                <p>{item.message}</p>
                            </div>
                            <div className="flex justify-end items-center mt-[10px]">
                                <button onClick={() => handleDelete(item.id)} className="bg-red-600 px-[30px] rounded-[6px]">delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
