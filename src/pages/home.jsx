import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    
    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "massage"));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        setData(data);
    };

    useEffect(() => {
        getData();
    }, []);

    const searchdata = data.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    });

    const sortedData = searchdata.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
    });

    return (
        <div className="w-full min-h-[100vh] bg-slate-800">
            <div className="max-w-[800px] mx-auto h-full">
                <div className="flex justify-between items-center py-3 px-2">
                    <h1 className="text-[25px] font-bold text-white">Portfolio messages</h1>
                    <input onChange={(e) => setSearch(e.target.value)} className="border border-white rounded p-1" type="text" placeholder="search message"/>
                </div>
                <div className="flex flex-col gap-[1px] px-4">
                    <h1 className="text-[20px] font-bold text-white">All Message ( {searchdata.length} )</h1>
                    {sortedData?.map((item, index) => (
                        <div key={index} className="bg-slate-600 rounded-md border border-white p-3 my-3">
                            <div className="flex justify-between flex-wrap">
                                <p className="font-bold text-white">Gmail: {item.email}</p>
                                <h1 className="text-slate-300 font-bold flex gap-[10px]"><span className="text-white">Tel:</span>{item.number}</h1>
                            </div>
                            <div className="flex justify-between">
                                <h1 className="font-bold text-white">Name: {item.name}</h1>
                            </div>
                            <div className="w-full font-light text-wrap text-white h-[80px] rounded p-1 border border-slate-400">
                                <p>{item.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
